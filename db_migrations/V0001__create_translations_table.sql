CREATE TABLE IF NOT EXISTS t_p46381053_multilingual_transla.translations (
    id SERIAL PRIMARY KEY,
    source_text TEXT NOT NULL,
    translated_text TEXT NOT NULL,
    target_language VARCHAR(10) NOT NULL,
    detected_language VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);