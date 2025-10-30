-- Add BM (Bahasa Malaysia) columns for multilanguage support
ALTER TABLE pages_blocks_digital_content_hero ADD COLUMN banner_text_bm TEXT;
ALTER TABLE pages_blocks_digital_content_hero ADD COLUMN banner_description_bm TEXT;
ALTER TABLE pages_blocks_digital_content_hero ADD COLUMN cta_text_bm TEXT;

ALTER TABLE pages_blocks_focus_area_areas ADD COLUMN title_bm TEXT;
ALTER TABLE pages_blocks_focus_area_areas ADD COLUMN description_bm TEXT;

ALTER TABLE pages_blocks_focus_area ADD COLUMN heading_bm TEXT;
