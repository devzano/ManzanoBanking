'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createUser, userLogin } from '@/lib/actions/user.actions';

const AuthForm = ({ type }: { type: string; }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {

      if(type === 'signup') {
        const newUser = await createUser(data);
        setUser(newUser)
      }

      if(type === 'login') {
        const response = await userLogin({
          email: data.email,
          password: data.password,
        });

        if(response) router.push('/')
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={64}
            height={44}
            alt="Manzano Banking Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            MB
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? 'Link Account'
              : type === 'login'
                ? 'Login'
                : 'Signup'
            }
            <p className="text-16 font-normal text-gray-600">
              {user
                ? 'Link an account to get started!'
                : 'Please enter some credentials!'
              }
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/* PlaidLink */}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'signup' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="firstName" label="First Name" placeholder="first name"/>
                    <CustomInput control={form.control} name="lastName" label="First Name" placeholder="first name"/>
                  </div>
                  <CustomInput control={form.control} name="address1" label="Address" placeholder="enter your address"/>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="city" label="City" placeholder="city"/>
                    <CustomInput control={form.control} name="state" label="State" placeholder="ex: FL"/>
                    <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="ex: 11001"/>
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="mm-dd-yyyy"/>
                    <CustomInput control={form.control} name="ssn" label="SSN" placeholder="ex: 1234"/>
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="email" label="Email" placeholder="enter your email"/>
                    <CustomInput control={form.control} name="password" label="Password" placeholder="enter your password"/>
                  </div>
                </>
              )}
              {type === 'login' && (
                <>
                  <CustomInput control={form.control} name="email" label="Email" placeholder="enter your email"/>
                  <CustomInput control={form.control} name="password" label="Password" placeholder="enter your password"/>
                </>
              )}
              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin"/>
                    </>
                  ) : type === 'login'
                    ? "Login" : "Signup"
                  }
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'login'
                ? "Don't have an account?"
                : "Already have an account?"
              }
            </p>
            <Link href={type === 'login' ? '/signup' : '/login'} className="form-link">
              {type === 'login' ? "Signup" : "Login"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;