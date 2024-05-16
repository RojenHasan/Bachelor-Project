import requests
from bs4 import BeautifulSoup
import csv

def scrape_ikea_products(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    products = []

    for product in soup.find_all('div', class_='pip-product-compact'):
        name = product.find('span', class_='pip-temp-price-module__name-decorator').text.strip()
        description = product.find('span', class_='pip-header-section__description-text').text.strip()
        price = product.find('span', class_='pip-temp-price__integer').text.strip()
        photo_url = product.find('img', class_='pip-image')['src']
        products.append({'name': name, 'description': description, 'price': price, 'photo_url': photo_url})

    return products

def save_to_csv(products, filename):
    with open(filename, 'w', newline='') as csvfile:
        fieldnames = ['name', 'description', 'price', 'photo_url']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for product in products:
            writer.writerow(product)

def scrape_all_pages(base_url, max_pages, filename):
    all_products = []
    for page_num in range(1, max_pages + 1):
        url = f"{base_url}?page={page_num}"
        products = scrape_ikea_products(url)
        all_products.extend(products)
    save_to_csv(all_products, filename)
    print(f"Scraping complete. {len(all_products)} products scraped.")

base_url = 'https://www.ikea.com/us/en/cat/beds-bm003/'
max_pages = 30  # You may need to adjust this based on the actual number of pages
filename = 'ikea_beds.csv'
scrape_all_pages(base_url, max_pages, filename)
