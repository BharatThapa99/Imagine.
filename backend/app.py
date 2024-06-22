
from flask import Flask, request, render_template, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    url = request.args.get('url', '')    
    context = {'url': url}
    return render_template('index.html', **context)
    # return render_template('index.html')

@app.route('/fetch-meta', methods=['GET'])
def generate_image_from_link():
    # Fetch HTML content
    url = request.args.get('url', '')    
    if url:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
        response = requests.get(url, headers=headers)
        # response = requests.get(url)
        html_content = response.text

        # Parse HTML
        soup = BeautifulSoup(html_content, 'html.parser')

        # Extract title and image URL
        title = soup.title.text.strip()
        og_image_meta = soup.find('meta', property='og:image')
        # print(title)
        if og_image_meta:
            image_url = og_image_meta['content']
        else:
            # If og:image is not present, try to get the image URL from the preload link
            preload_link = soup.find("link",{"rel":"preload"})
            if preload_link and 'href' in preload_link.attrs:
                image_url = preload_link['href']
            else:
                print("Image URL not found.")
                return jsonify(success=False, error="Image URL not found. Check source code.")
            
        return jsonify(success=True, title=title,image_url=image_url)
    return jsonify(success=False, error="No url provided")
    


if __name__ == '__main__':
    app.run(debug=True,port=5000)
