# Thanksgiving Family Submission App

A simple Next.js application for collecting family information for Thanksgiving gatherings, with Supabase backend.

## Features

- 📝 Simple form with required field validation
- 🗄️ Direct Supabase database integration
- ✨ Clean UI with Tailwind CSS
- 🔒 Built-in HTML5 form validation

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available at [supabase.com](https://supabase.com))

## Quick Start

See `SETUP.md` for detailed step-by-step instructions.

### 1. Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Open the SQL Editor in your dashboard
3. Copy the SQL from `DATABASE.md` and run it

### 2. Environment Configuration

1. Get your Supabase URL and anon key from Settings > API
2. Edit `.env.local` and add your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. Run the App

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Form Fields

- Family Name
- Number of Adults
- Number of Children
- Street Address
- City
- Zip Code (5-digit validation)
- Phone Number
- Email Address

All fields are required and validated before submission.

## Project Structure

```
thanksgiving-app/
├── app/
│   ├── page.tsx          # Main page with form
│   └── layout.tsx        # Root layout
├── components/
│   └── FamilySubmissionForm.tsx   # Form component with Supabase integration
├── lib/
│   └── supabase.ts       # Supabase client
└── .env.local            # Your Supabase credentials
```

## How It Works

1. User fills out the form
2. Form validates all required fields
3. Data is sent directly to Supabase
4. Success message appears and form resets

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database

## Viewing Submissions

1. Log in to your Supabase dashboard
2. Go to Table Editor
3. Select `family_submissions` table
4. View all submissions with timestamps

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## License

MIT
