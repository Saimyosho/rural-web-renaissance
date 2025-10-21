"""
Analytics API - Superadmin Only
Provides business intelligence data from Supabase analytics views
100% FREE - uses only Supabase queries
"""

from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.parse
import urllib.request
from datetime import datetime, timedelta

# Environment variables
SUPABASE_URL = os.environ.get('VITE_SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('VITE_SUPABASE_ANON_KEY', '')

class AnalyticsAPI:
    """Analytics data fetcher for superadmin dashboard"""
    
    def __init__(self):
        self.base_url = SUPABASE_URL
        self.api_key = SUPABASE_KEY
    
    def _is_superadmin(self, user_id: str) -> bool:
        """Check if user is superadmin"""
        try:
            url = f"{self.base_url}/rest/v1/user_profiles?id=eq.{user_id}&select=role"
            
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
            
            return data and len(data) > 0 and data[0].get('role') == 'superadmin'
            
        except Exception as e:
            print(f"Error checking superadmin: {e}")
            return False
    
    def get_overview_stats(self) -> dict:
        """Get high-level overview statistics"""
        try:
            # Total users
            url = f"{self.base_url}/rest/v1/user_profiles?select=count"
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            req.add_header('Prefer', 'count=exact')
            
            with urllib.request.urlopen(req) as response:
                total_users = int(response.headers.get('Content-Range', '0-0/0').split('/')[-1])
            
            # Active users (last 7 days)
            seven_days_ago = (datetime.now() - timedelta(days=7)).isoformat()
            url = f"{self.base_url}/rest/v1/events?ts=gte.{seven_days_ago}&select=user_id"
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            
            with urllib.request.urlopen(req) as response:
                events_data = json.loads(response.read().decode())
                active_users = len(set(e['user_id'] for e in events_data if e['user_id']))
            
            # Total AI generations
            url = f"{self.base_url}/rest/v1/events?event_type=eq.ai_generation_completed&select=count"
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            req.add_header('Prefer', 'count=exact')
            
            with urllib.request.urlopen(req) as response:
                total_generations = int(response.headers.get('Content-Range', '0-0/0').split('/')[-1])
            
            # Revenue (paid users)
            url = f"{self.base_url}/rest/v1/user_profiles?tier=neq.free&select=count"
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            req.add_header('Prefer', 'count=exact')
            
            with urllib.request.urlopen(req) as response:
                paid_users = int(response.headers.get('Content-Range', '0-0/0').split('/')[-1])
            
            return {
                'total_users': total_users,
                'active_users_7d': active_users,
                'total_ai_generations': total_generations,
                'paid_users': paid_users,
                'mrr_estimate': paid_users * 99,  # Assuming $99/month
                'conversion_rate': round((paid_users / max(total_users, 1)) * 100, 2)
            }
            
        except Exception as e:
            print(f"Error getting overview stats: {e}")
            return {
                'total_users': 0,
                'active_users_7d': 0,
                'total_ai_generations': 0,
                'paid_users': 0,
                'mrr_estimate': 0,
                'conversion_rate': 0
            }
    
    def get_daily_signups(self, days: int = 30) -> list:
        """Get daily signup data from analytics view"""
        try:
            url = f"{self.base_url}/rest/v1/analytics_daily_signups?order=signup_date.desc&limit={days}"
            
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
            
            return data
            
        except Exception as e:
            print(f"Error getting daily signups: {e}")
            return []
    
    def get_conversion_funnel(self) -> list:
        """Get conversion funnel data by industry"""
        try:
            url = f"{self.base_url}/rest/v1/analytics_conversion_funnel?order=total_signups.desc"
            
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
            
            return data
            
        except Exception as e:
            print(f"Error getting conversion funnel: {e}")
            return []
    
    def get_ai_usage(self, days: int = 30) -> list:
        """Get AI tool usage statistics"""
        try:
            url = f"{self.base_url}/rest/v1/analytics_ai_usage?order=usage_date.desc&limit={days * 3}"
            
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
            
            return data
            
        except Exception as e:
            print(f"Error getting AI usage: {e}")
            return []
    
    def get_user_engagement(self, limit: int = 100) -> list:
        """Get user engagement metrics"""
        try:
            url = f"{self.base_url}/rest/v1/analytics_user_engagement?order=total_events.desc&limit={limit}"
            
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
            
            return data
            
        except Exception as e:
            print(f"Error getting user engagement: {e}")
            return []
    
    def get_industry_benchmarks(self) -> list:
        """Get industry benchmark data (K-anonymous)"""
        try:
            url = f"{self.base_url}/rest/v1/analytics_industry_benchmarks?order=total_users.desc"
            
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
            
            return data
            
        except Exception as e:
            print(f"Error getting industry benchmarks: {e}")
            return []
    
    def get_churn_risk(self) -> list:
        """Get users at risk of churning"""
        try:
            url = f"{self.base_url}/rest/v1/analytics_churn_risk?order=days_inactive.desc&limit=50"
            
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
            
            return data
            
        except Exception as e:
            print(f"Error getting churn risk: {e}")
            return []
    
    def get_revenue_metrics(self) -> dict:
        """Calculate revenue and LTV metrics"""
        try:
            # Get all paid users with their subscription info
            url = f"{self.base_url}/rest/v1/user_profiles?tier=neq.free&select=id,tier,created_at,generation_count"
            
            req = urllib.request.Request(url)
            req.add_header('apikey', self.api_key)
            req.add_header('Authorization', f'Bearer {self.api_key}')
            
            with urllib.request.urlopen(req) as response:
                paid_users = json.loads(response.read().decode())
            
            # Calculate metrics
            tier_pricing = {'pro': 99, 'enterprise': 499}
            
            mrr = sum(tier_pricing.get(user['tier'], 0) for user in paid_users)
            arr = mrr * 12
            
            # Average LTV (simplified: MRR * average lifetime in months)
            avg_lifetime_months = 12  # Assumption
            avg_ltv = (mrr / max(len(paid_users), 1)) * avg_lifetime_months
            
            return {
                'mrr': mrr,
                'arr': arr,
                'paid_users': len(paid_users),
                'avg_ltv': round(avg_ltv, 2),
                'tier_breakdown': {
                    'pro': len([u for u in paid_users if u['tier'] == 'pro']),
                    'enterprise': len([u for u in paid_users if u['tier'] == 'enterprise'])
                }
            }
            
        except Exception as e:
            print(f"Error calculating revenue metrics: {e}")
            return {
                'mrr': 0,
                'arr': 0,
                'paid_users': 0,
                'avg_ltv': 0,
                'tier_breakdown': {'pro': 0, 'enterprise': 0}
            }

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
    
    def do_GET(self):
        """Handle GET requests for analytics data"""
        try:
            # Parse URL and query params
            parsed_url = urllib.parse.urlparse(self.path)
            query_params = urllib.parse.parse_qs(parsed_url.query)
            
            # Get user ID from query (should be from auth token in production)
            user_id = query_params.get('user_id', [None])[0]
            endpoint = query_params.get('endpoint', ['overview'])[0]
            
            if not user_id:
                self._send_response(400, {
                    'success': False,
                    'error': 'user_id required'
                })
                return
            
            # Initialize API
            api = AnalyticsAPI()
            
            # Check if superadmin
            if not api._is_superadmin(user_id):
                self._send_response(403, {
                    'success': False,
                    'error': 'Access denied. Superadmin only.'
                })
                return
            
            # Route to appropriate endpoint
            if endpoint == 'overview':
                data = api.get_overview_stats()
            elif endpoint == 'signups':
                days = int(query_params.get('days', [30])[0])
                data = api.get_daily_signups(days)
            elif endpoint == 'funnel':
                data = api.get_conversion_funnel()
            elif endpoint == 'ai_usage':
                days = int(query_params.get('days', [30])[0])
                data = api.get_ai_usage(days)
            elif endpoint == 'engagement':
                limit = int(query_params.get('limit', [100])[0])
                data = api.get_user_engagement(limit)
            elif endpoint == 'benchmarks':
                data = api.get_industry_benchmarks()
            elif endpoint == 'churn':
                data = api.get_churn_risk()
            elif endpoint == 'revenue':
                data = api.get_revenue_metrics()
            else:
                self._send_response(400, {
                    'success': False,
                    'error': f'Unknown endpoint: {endpoint}'
                })
                return
            
            # Return data
            self._send_response(200, {
                'success': True,
                'data': data,
                'timestamp': datetime.now().isoformat()
            })
            
        except Exception as e:
            print(f"Error: {e}")
            self._send_response(500, {
                'success': False,
                'error': str(e)
            })
    
    def do_POST(self):
        """Handle POST for tracking events"""
        try:
            # Parse request body
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(body) if body else {}
            
            # Extract event data
            user_id = data.get('user_id')
            event_type = data.get('event_type')
            payload = data.get('payload', {})
            
            if not user_id or not event_type:
                self._send_response(400, {
                    'success': False,
                    'error': 'user_id and event_type required'
                })
                return
            
            # Prepare event record
            event = {
                'user_id': user_id,
                'event_type': event_type,
                'ts': data.get('ts', datetime.now().isoformat()),
                'session_id': data.get('session_id'),
                'page': data.get('page'),
                'utm_source': data.get('utm_source'),
                'utm_campaign': data.get('utm_campaign'),
                'country': data.get('country'),
                'region': data.get('region'),
                'device_class': data.get('device_class'),
                'payload': json.dumps(payload)
            }
            
            # Insert into Supabase
            url = f"{SUPABASE_URL}/rest/v1/events"
            event_data = json.dumps(event).encode('utf-8')
            
            req = urllib.request.Request(
                url,
                data=event_data,
                headers={
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': f'Bearer {SUPABASE_KEY}',
                    'Prefer': 'return=minimal'
                },
                method='POST'
            )
            
            with urllib.request.urlopen(req) as response:
                success = response.status == 201
            
            self._send_response(200 if success else 500, {
                'success': success,
                'event_type': event_type
            })
            
        except Exception as e:
            print(f"Error tracking event: {e}")
            self._send_response(500, {
                'success': False,
                'error': str(e)
            })
