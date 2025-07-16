// src/pages/Auth/Signup.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fetchCountryCodes } from '../../api/restcountries';

const schema = z.object({
  countryCode: z.string().nonempty("Select country"),
  phone: z.string().min(10, "Enter a valid number"),
  // Add name, password, etc. if required
});

export default function Signup() {
  const [countries, setCountries] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { countryCode: '' },
  });

  useEffect(() => {
    fetchCountryCodes().then(setCountries);
  }, []);

  const onSubmit = data => {
    console.log("Signup Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto mt-6">
      <div>
        <label className="block mb-1">Country</label>
        <select {...register('countryCode')} className="w-full border p-2 rounded">
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={`${c.name}-${c.code}`} value={c.code}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
        {errors.countryCode && <p className="text-red-500">{errors.countryCode.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Phone Number</label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full border p-2 rounded"
          placeholder="1234567890"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Sign Up
      </button>
    </form>
  );
}
