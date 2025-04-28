import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const macroSchema = z.object({
  dailyCalories: z.number().min(500).max(10000),
  dailyProtein: z.number().min(10).max(500),
  dailyCarbs: z.number().min(10).max(1000),
  dailyFats: z.number().min(10).max(500),
});

type MacroFormData = z.infer<typeof macroSchema>;

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<MacroFormData>({
    resolver: zodResolver(macroSchema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          reset({
            dailyCalories: userData.dailyCalories,
            dailyProtein: userData.dailyProtein,
            dailyCarbs: userData.dailyCarbs,
            dailyFats: userData.dailyFats,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, reset]);

  const onSubmit = async (data: MacroFormData) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        dailyCalories: data.dailyCalories,
        dailyProtein: data.dailyProtein,
        dailyCarbs: data.dailyCarbs,
        dailyFats: data.dailyFats,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update macro targets');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
        
        <div className="mt-6">
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Macro Targets</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Set your daily macro nutrient targets
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="dailyCalories" className="block text-sm font-medium text-gray-700">
                        Daily Calories (kcal)
                      </label>
                      <input
                        type="number"
                        {...register('dailyCalories', { valueAsNumber: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                      {errors.dailyCalories && (
                        <p className="mt-1 text-sm text-red-600">{errors.dailyCalories.message}</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="dailyProtein" className="block text-sm font-medium text-gray-700">
                        Daily Protein (g)
                      </label>
                      <input
                        type="number"
                        {...register('dailyProtein', { valueAsNumber: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                      {errors.dailyProtein && (
                        <p className="mt-1 text-sm text-red-600">{errors.dailyProtein.message}</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="dailyCarbs" className="block text-sm font-medium text-gray-700">
                        Daily Carbohydrates (g)
                      </label>
                      <input
                        type="number"
                        {...register('dailyCarbs', { valueAsNumber: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                      {errors.dailyCarbs && (
                        <p className="mt-1 text-sm text-red-600">{errors.dailyCarbs.message}</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="dailyFats" className="block text-sm font-medium text-gray-700">
                        Daily Fats (g)
                      </label>
                      <input
                        type="number"
                        {...register('dailyFats', { valueAsNumber: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                      {errors.dailyFats && (
                        <p className="mt-1 text-sm text-red-600">{errors.dailyFats.message}</p>
                      )}
                    </div>
                  </div>

                  {success && (
                    <div className="mt-4 rounded-md bg-green-50 p-4">
                      <div className="text-sm text-green-700">
                        Macro targets updated successfully!
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="mt-4 rounded-md bg-red-50 p-4">
                      <div className="text-sm text-red-700">{error}</div>
                    </div>
                  )}

                  <div className="mt-5">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 