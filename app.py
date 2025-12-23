"""
Simple HTTP server for local development.
Email handling is now done via EmailJS (client-side).
For production, serve index.html via your hosting platform.
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import sys

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def do_GET(self):
        if self.path == '/' or self.path == '/index.html':
            self.path = '/index.html'
        return super().do_GET()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = HTTPServer(('localhost', 5000), MyHTTPRequestHandler)
    print("🚀 Server running at http://localhost:5000")
    print("📧 Email via EmailJS (no backend needed)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
