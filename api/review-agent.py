"""
Review Response Agent API
Auto-respond to reviews from Google, Yelp, and Facebook using AI
"""

from http.server import BaseHTTPRequestHandler
import json
import os
from datetime import datetime
from typing import Optional, Dict, List
import urllib.parse
import urllib.request

# Environment variables
GEMINI_API_KEY = os.environ.get('GOOGLE_GEMINI_API_KEY', '')
GOOGLE_PLACES_API_KEY = os.environ.get('GOOGLE_PLACES_API_KEY', '')
YELP_API_KEY = os.environ.get('YELP_API_KEY', '')
SUPABASE_URL = os.environ.get('VITE_SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('VITE_SUPABASE_ANON_KEY', '')

class ReviewAgent:
    """Handle review fetching and AI response generation"""
    
    def __init__(self):
        self.gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    
    def fetch_google_reviews(self, place_id: str) -> List[Dict]:
        """Fetch reviews from Google Places API"""
        try:
            url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=reviews&key={GOOGLE_PLACES_API_KEY}"
            
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
                
            if data.get('status') == 'OK' and 'result' in data:
                reviews = data['result'].get('reviews', [])
                return [{
                    'platform': 'google',
                    'review_id': f"google_{review.get('time')}_{review.get('author_name')}",
                    'author': review.get('author_name', 'Anonymous'),
                    'rating': review.get('rating', 0),
                    'text': review.get('text', ''),
                    'timestamp': review.get('time', 0),
                    'profile_photo': review.get('profile_photo_url', '')
                } for review in reviews]
            
            return []
        except Exception as e:
            print(f"Error fetching Google reviews: {e}")
            return []
    
    def fetch_yelp_reviews(self, business_id: str) -> List[Dict]:
        """Fetch reviews from Yelp Fusion API"""
        try:
            url = f"https://api.yelp.com/v3/businesses/{business_id}/reviews"
            
            req = urllib.request.Request(url)
            req.add_header('Authorization', f'Bearer {YELP_API_KEY}')
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
            
            reviews = data.get('reviews', [])
            return [{
                'platform': 'yelp',
                'review_id': review.get('id', ''),
                'author': review.get('user', {}).get('name', 'Anonymous'),
                'rating': review.get('rating', 0),
                'text': review.get('text', ''),
                'timestamp': int(datetime.fromisoformat(review.get('time_created', '2024-01-01')).timestamp()),
                'profile_photo': review.get('user', {}).get('image_url', '')
            } for review in reviews]
        except Exception as e:
            print(f"Error fetching Yelp reviews: {e}")
            return []
    
    def generate_ai_response(self, review_text: str, rating: int, business_name: str = "your business") -> str:
        """Generate AI response to review using Google Gemini"""
        try:
            # Create context-aware prompt
            tone = "warm and appreciative" if rating >= 4 else "empathetic and solution-focused"
            
            prompt = f"""You are a professional customer service representative for {business_name}.
            
Generate a {tone} response to this {rating}-star review:
"{review_text}"

Guidelines:
- Be authentic and personal, not corporate
- Thank them for the review
- {f'Address their concerns specifically and offer a solution' if rating < 4 else 'Express genuine gratitude'}
- Keep it under 100 words
- End with an invitation to return or continue the conversation
- Use a friendly, professional tone

Response:"""
            
            # Call Gemini API
            payload = {
                "contents": [{
                    "parts": [{"text": prompt}]
                }],
                "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 200,
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
            
            return "Thank you for your review! We appreciate your feedback."
            
        except Exception as e:
            print(f"Error generating AI response: {e}")
            return "Thank you for your review! We appreciate your feedback and would love to hear more about your experience."
    
    def save_response_to_db(self, user_id: str, review_data: Dict, ai_response: str) -> bool:
        """Save generated response to Supabase"""
        try:
            url = f"{SUPABASE_URL}/rest/v1/review_responses"
            
            payload = {
                "user_id": user_id,
                "platform": review_data.get('platform'),
                "review_id": review_data.get('review_id'),
                "review_text": review_data.get('text'),
                "review_rating": review_data.get('rating'),
                "ai_response": ai_response,
                "author_name": review_data.get('author'),
                "published": False,
                "created_at": datetime.utcnow().isoformat()
            }
            
            data = json.dumps(payload).encode('utf-8')
            req = urllib.request.Request(
                url,
                data=data,
                headers={
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': f'Bearer {SUPABASE_KEY}',
                    'Prefer': 'return=minimal'
                },
                method='POST'
            )
            
            with urllib.request.urlopen(req) as response:
                return response.status == 201
            
        except Exception as e:
            print(f"Error saving to database: {e}")
            return False

class handler(BaseHTTPRequestHandler):
    """Vercel serverless function handler"""
    
    def _send_cors_headers(self):
        """Send CORS headers"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    def _send_response(self, status_code: int, data: Dict):
        """Send JSON response"""
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def do_OPTIONS(self):
        """Handle preflight requests"""
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
            
            # Parse URL path
            parsed_path = urllib.parse.urlparse(self.path)
            action = parsed_path.path.split('/')[-1]
            
            agent = ReviewAgent()
            
            # Route to appropriate handler
            if action == 'fetch-reviews':
                # Fetch reviews from platforms
                platform = data.get('platform', 'google')
                identifier = data.get('identifier', '')
                
                if not identifier:
                    self._send_response(400, {'error': 'Missing identifier'})
                    return
                
                if platform == 'google':
                    reviews = agent.fetch_google_reviews(identifier)
                elif platform == 'yelp':
                    reviews = agent.fetch_yelp_reviews(identifier)
                else:
                    self._send_response(400, {'error': 'Invalid platform'})
                    return
                
                self._send_response(200, {
                    'success': True,
                    'reviews': reviews,
                    'count': len(reviews)
                })
            
            elif action == 'generate-response':
                # Generate AI response for a review
                review_text = data.get('review_text', '')
                rating = data.get('rating', 5)
                business_name = data.get('business_name', 'your business')
                user_id = data.get('user_id', '')
                
                if not review_text:
                    self._send_response(400, {'error': 'Missing review text'})
                    return
                
                # Generate response
                ai_response = agent.generate_ai_response(review_text, rating, business_name)
                
                # Save to database
                if user_id:
                    agent.save_response_to_db(user_id, data, ai_response)
                
                self._send_response(200, {
                    'success': True,
                    'response': ai_response
                })
            
            elif action == 'bulk-generate':
                # Generate responses for multiple reviews
                reviews = data.get('reviews', [])
                business_name = data.get('business_name', 'your business')
                user_id = data.get('user_id', '')
                
                responses = []
                for review in reviews:
                    ai_response = agent.generate_ai_response(
                        review.get('text', ''),
                        review.get('rating', 5),
                        business_name
                    )
                    
                    response_data = {
                        'review_id': review.get('review_id'),
                        'platform': review.get('platform'),
                        'ai_response': ai_response
                    }
                    
                    # Save to DB
                    if user_id:
                        agent.save_response_to_db(user_id, review, ai_response)
                    
                    responses.append(response_data)
                
                self._send_response(200, {
                    'success': True,
                    'responses': responses,
                    'count': len(responses)
                })
            
            else:
                self._send_response(404, {'error': 'Invalid action'})
        
        except Exception as e:
            print(f"Error: {e}")
            self._send_response(500, {'error': str(e)})
    
    def do_GET(self):
        """Handle GET requests"""
        self._send_response(200, {
            'service': 'Review Response Agent API',
            'version': '1.0.0',
            'endpoints': [
                'POST /fetch-reviews - Fetch reviews from platforms',
                'POST /generate-response - Generate AI response for single review',
                'POST /bulk-generate - Generate responses for multiple reviews'
            ]
        })
