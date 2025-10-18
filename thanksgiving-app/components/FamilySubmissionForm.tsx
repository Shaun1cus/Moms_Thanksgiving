'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

interface FormData {
  familyName: string;
  numberOfAdults: number;
  numberOfChildren: number;
  streetAddress: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
  emailAddress: string;
}

export default function FamilySubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    familyName: '',
    numberOfAdults: 0,
    numberOfChildren: 0,
    streetAddress: '',
    city: '',
    zipCode: '',
    phoneNumber: '',
    emailAddress: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfAdults' || name === 'numberOfChildren' 
        ? parseInt(value) || 0 
        : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Check current submission count
      const { count, error: countError } = await supabase
        .from('family_submissions')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to check submission limit. Please try again.',
        });
        setIsSubmitting(false);
        return;
      }

      // Check if limit reached (500 submissions)
      if (count !== null && count >= 500) {
        setSubmitStatus({
          type: 'error',
          message: 'We have reached our maximum number of submissions. Thank you for your interest!',
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('family_submissions')
        .insert([
          {
            family_name: formData.familyName,
            number_of_adults: formData.numberOfAdults,
            number_of_children: formData.numberOfChildren,
            street_address: formData.streetAddress,
            city: formData.city,
            zip_code: formData.zipCode,
            phone_number: formData.phoneNumber,
            email_address: formData.emailAddress,
          },
        ]);

      if (error) {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to submit. Please try again.',
        });
      } else {
        setSubmitStatus({
          type: 'success',
          message: 'Family information submitted successfully!',
        });
        // Reset form
        setFormData({
          familyName: '',
          numberOfAdults: 0,
          numberOfChildren: 0,
          streetAddress: '',
          city: '',
          zipCode: '',
          phoneNumber: '',
          emailAddress: '',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Thanksgiving Family Submission
      </h1>

      {submitStatus.type && (
        <div
          className={`mb-4 p-4 rounded-md ${
            submitStatus.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="familyName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Family Name *
          </label>
          <input
            type="text"
            id="familyName"
            name="familyName"
            value={formData.familyName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="numberOfAdults"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Adults *
            </label>
            <input
              type="number"
              id="numberOfAdults"
              name="numberOfAdults"
              value={formData.numberOfAdults}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div>
            <label
              htmlFor="numberOfChildren"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Children *
            </label>
            <input
              type="number"
              id="numberOfChildren"
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="streetAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Street Address *
          </label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Zip Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              pattern="[0-9]{5}"
              title="Please enter a 5-digit zip code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number *
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div>
          <label
            htmlFor="emailAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Family Information'}
        </button>
      </form>
    </div>
  );
}
