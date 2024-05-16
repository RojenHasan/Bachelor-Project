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

url = 'https://www.ikea.com/us/en/cat/sofas-sectionals-fu003/?page=30'
products = scrape_ikea_products(url)
save_to_csv(products, 'ikea_sofas.csv')
