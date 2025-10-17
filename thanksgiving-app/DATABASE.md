# Database Schema

## Supabase Table: family_submissions

Create this table in your Supabase dashboard:

```sql
CREATE TABLE family_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_name VARCHAR(255) NOT NULL,
  number_of_adults INTEGER NOT NULL,
  number_of_children INTEGER NOT NULL,
  street_address TEXT NOT NULL,
  city VARCHAR(255) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  email_address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE family_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert
CREATE POLICY "Allow public insert access" ON family_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);
```

## Fields Description

- **id**: Unique identifier (UUID, auto-generated)
- **family_name**: Family's name (required)
- **number_of_adults**: Number of adults attending (required, integer)
- **number_of_children**: Number of children attending (required, integer)
- **street_address**: Street address (required)
- **city**: City (required)
- **zip_code**: Zip code (required)
- **phone_number**: Contact phone number (required)
- **email_address**: Contact email address (required)
- **created_at**: Timestamp of when the submission was created (auto-generated)

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the SQL code above
4. Run the query to create the table
5. The table will be ready to receive submissions from the form
