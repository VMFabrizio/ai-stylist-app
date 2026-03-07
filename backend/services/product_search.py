class ProductSearchService:
    """Wraps SerpAPI/product lookup (placeholder)."""

    def __init__(self):
        self.ready = True

    def status(self):
        return {"service": "product_search", "ready": self.ready}

    def find_matches(self, query: str):
        """Return dummy product data until real search is implemented."""
        return [
            {
                "title": "Stylish Jacket",
                "price": "120.00",
                "retailer": "Example Store",
                "link": "https://example.com/product/jacket",
            }
        ]
