# Quick Setup Guide

Follow these 4 simple steps to get your Thanksgiving Family Submission app running:

## Step 1: Set up Supabase Database

1. **Create a Supabase Project**
   - Go to https://supabase.com
   - Sign up or log in
   - Click "New Project"
   - Fill in project details and wait for it to initialize

2. **Create the Database Table**
   - In your Supabase dashboard, click on "SQL Editor" in the left sidebar
   - Open `DATABASE.md` in this project
   - Copy the entire SQL code
   - Paste it into the SQL Editor
   - Click "Run" or press Ctrl+Enter
   - You should see a success message

3. **Get Your API Credentials**
   - Click on "Settings" (gear icon) in the left sidebar
   - Click on "API" in the Settings menu
   - You'll see two important values:
     - **Project URL** (starts with `https://`)
     - **anon public** key (under "Project API keys")
   - Keep this tab open, you'll need these values in the next step

## Step 2: Configure Environment Variables

1. **Update the `.env.local` file**
   - Open `.env.local` in the `thanksgiving-app` folder
   - Replace `your_supabase_url_here` with your Project URL
   - Replace `your_supabase_anon_key_here` with your anon public key
   - Save the file

   Example:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Step 3: Start the Application

1. **Open a terminal** in the `thanksgiving-app` folder

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** and go to http://localhost:3000

4. **Test the form:**
   - Fill in all the fields
   - Click "Submit Family Information"
   - You should see a success message

## Step 4: Verify Data is Saved

1. Go back to your Supabase dashboard
2. Click on "Table Editor" in the left sidebar
3. Select the `family_submissions` table
4. You should see your test submission!

## That's It! 🎉

Your app is ready! The form will:
- ✅ Require all fields before submission
- ✅ Validate email format
- ✅ Validate 5-digit zip code
- ✅ Save data directly to Supabase
- ✅ Show success/error messages
- ✅ Reset after successful submission

## Architecture

This is a **simple, streamlined setup**:

1. Form component (`components/FamilySubmissionForm.tsx`)
2. Direct Supabase connection (`lib/supabase.ts`)
3. No API routes needed - form talks directly to database
4. HTML5 validation ensures all fields are filled

## Need Help?

- Check `README.md` for more details
- Review `DATABASE.md` for database schema
- Check browser console for error messages if submission fails
