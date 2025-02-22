"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateConMutation } from "@/redux/Api/contact/contactApi";
import contactSchema, { ContactFormData } from "@/schema/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [createCon, { isLoading, error }] = useCreateConMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    const contactData = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };

    try {
      await createCon(contactData).unwrap();
      setSuccessMessage("Your message has been sent successfully!");
      reset(); // Reset form after submission

      // Hide the success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <div className="md:pb-[140px] pt-[180px] pb-[80px] md:pt-[200px] px-4 dark:bg-[#0a0d14] bg-white flex items-center justify-center">
      <div className="w-full max-w-[643px] shadow-sm p-4 rounded-md">
        <h1 className="dark:text-white text-black text-4xl font-medium text-center mb-8">
          Get in Touch
        </h1>

        {successMessage && (
          <p className="text-black dark:text-white text-center mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="dark:text-white text-black">Enter Name</label>
              <Input
                id="name"
                placeholder="Esther Howard"
                {...register("name")}
                className="bg-white border dark:bg-[#1c1f26] border-gray dark:border-slate-900 dark:text-white text-black placeholder:text-gray-600"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="dark:text-white text-black">Email</label>
              <Input
                id="email"
                placeholder="alma.lawson@example.com"
                {...register("email")}
                className="bg-white border dark:bg-[#1c1f26] border-gray dark:border-slate-900 dark:text-white text-black placeholder:text-gray-600"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="dark:text-white text-black">Subject</label>
            <Input
              id="subject"
              placeholder="Enter your subject"
              {...register("subject")}
              className="bg-white border dark:bg-[#1c1f26] border-gray dark:border-slate-900 dark:text-white text-black placeholder:text-gray-600"
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="dark:text-white text-black">Message</label>
            <Textarea
              id="message"
              placeholder="Write a message..."
              {...register("message")}
              className="bg-white border dark:bg-[#1c1f26] border-gray dark:border-slate-900 dark:text-white text-black placeholder:text-gray-600"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-secondary rounded-[4px] hover:bg-[#4338ca] text-white py-6 text-lg font-medium"
            disabled={isLoading}
          >
            Submit Now
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">Error submitting form</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
