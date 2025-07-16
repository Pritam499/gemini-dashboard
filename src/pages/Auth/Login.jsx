import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCountryCodes } from '../../api/restcountries';
import { setCountryCode, setPhone } from '../../features/auth/authSlice';
import { sendOtp, verifyOtp } from '../../features/auth/authThunks';

const schema = z.object({
  countryCode: z.string().nonempty("Select country"),
  phone: z.string().min(10, "Enter a valid number"),
  otp: z.string().length(6).optional(),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otpSent, loading, verifying, verified } = useSelector((state) => state.auth);
  const [countries, setCountries] = useState([]);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { countryCode: '+1' },
  });

  useEffect(() => {
    fetchCountryCodes().then(setCountries);
  }, []);

  useEffect(() => {
    if (verified) navigate('/dashboard');
  }, [verified, navigate]);

  const onSubmit = (data) => {
    dispatch(setCountryCode(data.countryCode));
    dispatch(setPhone(data.phone));

    if (!otpSent) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      dispatch(sendOtp());
    } else {
      dispatch(verifyOtp(data.otp));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Login</h2>

        {otpSent && generatedOtp && (
          <p className="text-green-600 font-semibold text-center">
            Your OTP is: <span className="text-black dark:text-white">123456</span>
          </p>
        )}

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Country</label>
          <select {...register('countryCode')} className="w-full border p-2 rounded">
            {countries.map((c) => (
              <option key={`${c.name}-${c.code}`} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
          {errors.countryCode && <p className="text-red-500">{errors.countryCode.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full border p-2 rounded"
            placeholder="1234567890"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        {otpSent && (
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Enter OTP</label>
            <input
              type="text"
              {...register('otp')}
              className="w-full border p-2 rounded"
              placeholder="6-digit code"
            />
            {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || verifying}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Sending…' : verifying ? 'Verifying…' : otpSent ? 'Verify OTP' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
}
