"""
AI Content Writer API - IDIOT-PROOF VERSION
Simple: User types what they want, AI writes it.
"""

from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.parse
import urllib.request
from datetime import datetime

# Environment variables
GEMINI_API_KEY = os.environ.get('GOOGLE_GEMINI_API_KEY', '')
SUPABASE_URL = os.environ.get('VITE_SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('VITE_SUPABASE_ANON_KEY', '')

class ContentWriter:
    """Dead simple AI content generator"""
    
    def __init__(self):
        self.gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    
    def check_usage_limit(self, user_id: str) -> dict:
        """Check if user has generations remaining"""
        try:
            url = f"{SUPABASE_URL}/rest/v1/user_profiles?id=eq.{user_id}&select=generation_count,generation_limit,role"
            
            req = urllib.request.Request(url)
            req.add_header('apikey', SUPABASE_KEY)
            req.add_header('Authorization', f'Bearer {SUPABASE_KEY}')
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
            
            if data and len(data) > 0:
                profile = data[0]
                is_superadmin = profile.get('role') == 'superadmin'
                
                if is_superadmin:
                    return {'allowed': True, 'remaining': 999999, 'is_superadmin': True}
                
                remaining = profile.get('generation_limit', 3) - profile.get('generation_count', 0)
                return {
                    'allowed': remaining > 0,
                    'remaining': remaining,
                    'is_superadmin': False
                }
            
            return {'allowed': False, 'remaining': 0, 'is_superadmin': False, 'error': 'Profile not found'}
            
        except Exception as e:
            print(f"Error checking usage: {e}")
            return {'allowed': False, 'remaining': 0, 'is_superadmin': False, 'error': str(e)}
    
    def increment_usage(self, user_id: str) -> bool:
        """Increment user's generation count"""
        try:
            # First check if superadmin
            check_url = f"{SUPABASE_URL}/rest/v1/user_profiles?id=eq.{user_id}&select=role"
            req = urllib.request.Request(check_url)
            req.add_header('apikey', SUPABASE_KEY)
            req.add_header('Authorization', f'Bearer {SUPABASE_KEY}')
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
            
            if data and len(data) > 0 and data[0].get('role') == 'superadmin':
                return True  # Don't increment for superadmin
            
            # Increment for regular users
            url = f"{SUPABASE_URL}/rest/v1/rpc/increment_generation_count"
            payload = json.dumps({'user_uuid': user_id}).encode('utf-8')
            
            req = urllib.request.Request(
                url,
                data=payload,
                headers={
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': f'Bearer {SUPABASE_KEY}'
                },
                method='POST'
            )
            
            with urllib.request.urlopen(req) as response:
                return response.status == 200
            
        except Exception as e:
            print(f"Error incrementing usage: {e}")
            return False
    
    def generate_content(self, prompt: str, content_type: str = 'general') -> str:
        """Generate content using Gemini AI - SIMPLE"""
        try:
            # Build the AI prompt based on content type
            prompts = {
                'blog': f"Write a professional blog post about: {prompt}\n\nMake it engaging, informative, and SEO-friendly. Include an introduction, main points, and conclusion.",
                'social': f"Write a catchy social media post about: {prompt}\n\nKeep it short, engaging, with emojis. Perfect for Facebook or Instagram.",
                'email': f"Write a professional email about: {prompt}\n\nInclude subject line, greeting, body, and closing.",
                'ad': f"Write compelling ad copy for: {prompt}\n\nMake it attention-grabbing and persuasive. Include a strong call-to-action.",
                'general': f"Write professional content about: {prompt}\n\nMake it clear, concise, and useful."
            }
            
            full_prompt = prompts.get(content_type, prompts['general'])
            
            # Call Gemini API
            payload = {
                "contents": [{
                    "parts": [{"text": full_prompt}]
                }],
                "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 1000,
                }
            }
            
            data = json.dumps(payload).encode('utf-8')
            req = urllib.request.Request(
                f"{self.gemini_url}?key={GEMINI_API_KEY}",
                data=data,
                headers={'Content-Type': 'application/json'}
            )
            
            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read().decode())
            
            # Extract generated text
            if 'candidates' in result and len(result['candidates']) > 0:
                generated_text = result['candidates'][0]['content']['parts'][0]['text']
                return generated_text.strip()
            
            return "Sorry, I couldn't generate content right now. Please try again."
            
        except Exception as e:
            print(f"Error generating content: {e}")
            return f"Error: {str(e)}"

class handler(BaseHTTPRequestHandler):
    """Vercel serverless function handler"""
    
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    def _send_response(self, status_code: int, data: dict):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()
    
    def do_POST(self):
        """Handle POST requests"""
        try:
            # Parse request body
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(body) if body else {}
            
            writer = ContentWriter()
            
            # Get required fields
            user_id = data.get('user_id')
            prompt = data.get('prompt', '').strip()
            content_type = data.get('content_type', 'general')
            
            # Validation - IDIOT PROOF
            if not user_id:
                self._send_response(400, {
                    'success': False,
                    'error': 'Please log in first!'
                })
                return
            
            if not prompt:
                self._send_response(400, {
                    'success': False,
                    'error': 'Please tell me what you want me to write!'
                })
                return
            
            if len(prompt) < 5:
                self._send_response(400, {
                    'success': False,
                    'error': 'Please be more specific! Tell me more details.'
                })
                return
            
            # Check usage limit
            usage_check = writer.check_usage_limit(user_id)
            
            if not usage_check['allowed']:
                self._send_response(403, {
                    'success': False,
                    'error': f"You've used all {usage_check.get('remaining', 0)} free tries! Please upgrade to continue.",
                    'remaining': 0
                })
                return
            
            # Generate content
            content = writer.generate_content(prompt, content_type)
            
            # Increment usage count
            writer.increment_usage(user_id)
            
            # Return success
            self._send_response(200, {
                'success': True,
                'content': content,
                'remaining': usage_check['remaining'] - 1 if not usage_check['is_superadmin'] else 999999
            })
        
        except Exception as e:
            print(f"Error: {e}")
            self._send_response(500, {
                'success': False,
                'error': 'Something went wrong. Please try again!'
            })
    
    def do_GET(self):
        """Handle GET requests"""
        self._send_response(200, {
            'service': 'AI Content Writer API',
            'version': '1.0.0',
            'usage': 'POST with {user_id, prompt, content_type}'
        })
