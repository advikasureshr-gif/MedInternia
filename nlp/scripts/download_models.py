#!/usr/bin/env python3
"""
scripts/download_models.py
==========================
Pre-download and cache both NER model checkpoints so the FastAPI container
starts up in seconds (weights are already on disk, no internet required at
inference time).

Usage:
    python scripts/download_models.py

The script respects the DISEASE_MODEL and GENERAL_BIO_MODEL environment
variables so you can swap checkpoints without editing code.
"""

import os
import sys
import time
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("medinternia.download")


def main() -> None:
    try:
        from transformers import AutoTokenizer, AutoModelForTokenClassification
    except ImportError:
        log.error("transformers is not installed — run: pip install -r requirements.txt")
        sys.exit(1)

    models = [
        os.getenv("DISEASE_MODEL", "pruas/BENT-PubMedBERT-NER-Disease"),
        os.getenv("GENERAL_BIO_MODEL", "d4data/biomedical-ner-all"),
    ]

    for model_name in models:
        log.info("Downloading %s …", model_name)
        t0 = time.time()
        try:
            AutoTokenizer.from_pretrained(model_name)
            AutoModelForTokenClassification.from_pretrained(model_name)
            log.info("  ✓ Done in %.1f s", time.time() - t0)
        except Exception as exc:
            log.error("  ✗ Failed: %s", exc)
            sys.exit(1)

    log.info("All models cached successfully.")


if __name__ == "__main__":
    main()