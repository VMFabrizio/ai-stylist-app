import json
from pathlib import Path
from typing import Dict, List, Optional


class CatalogService:
    """Searches a mock fashion catalog for matching style tags."""

    def __init__(self):
        catalog_path = Path(__file__).resolve().parents[1] / "data" / "fashion_catalog.json"
        try:
            with open(catalog_path, encoding="utf-8") as handle:
                self.items = json.load(handle)
        except FileNotFoundError:
            self.items = []

    def search(
        self,
        preferences: Dict[str, List[Dict[str, str]]],
        filters: Optional[Dict[str, str]] = None,
        limit: int = 12,
    ) -> List[Dict[str, str]]:
        """Return catalog items filtered and ranked by matching tags."""
        filters = filters or {}
        target_tags = {
            entry["tag"].lower()
            for bucket in preferences.values()
            for entry in bucket
            if entry.get("tag")
        }

        scored_items = []
        for item in self.items:
            if not self._matches_filters(item, filters):
                continue

            item_tags = {tag.lower() for tag in item.get("style_tags", [])}
            score = len(target_tags.intersection(item_tags))
            scored_items.append((score, item))

        scored_items.sort(key=lambda pair: pair[0], reverse=True)
        top_matches = [item for score, item in scored_items if score > 0]
        if not top_matches:
            top_matches = [item for _, item in scored_items]
        if not top_matches:
            top_matches = self.items

        return top_matches[:limit]

    def _matches_filters(self, item: Dict[str, str], filters: Dict[str, str]) -> bool:
        """Return False if the item fails any provided filter."""
        category = filters.get("category", "").lower()
        color = filters.get("color", "").lower()
        price = filters.get("price", "").lower()
        tag = filters.get("tag", "").lower()
        search = filters.get("search", "").lower()

        if category and item.get("category", "").lower() != category:
            return False
        if color and item.get("color", "").lower() != color:
            return False
        if price and item.get("price_range", "").lower() != price:
            return False
        if tag and tag not in [style.lower() for style in item.get("style_tags", [])]:
            return False
        if search:
            haystack = " ".join(
                [
                    item.get("item_name", ""),
                    item.get("brand", ""),
                    item.get("description", ""),
                ]
            ).lower()
            if search not in haystack:
                return False
        return True
