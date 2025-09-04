"use client";
import { useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";

const NewsletterBox = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) return "Name is required.";
    if (!email.trim() || !emailRegex.test(email)) return "A valid email is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (response.ok) {
        if (result.message === "Email already subscribed.") {
          toast.success("You are already subscribed!");
        } else {
          toast.success("Thank you for subscribing!");
          setFormData({ name: "", email: "" });
        }
      } else {
        toast.error(result?.message || "Failed to subscribe.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="relative z-10 rounded-lg bg-white p-8 shadow-three dark:bg-gray-dark sm:p-11 lg:p-8 xl:p-11">
      <h3 className="mb-4 text-2xl font-bold leading-tight text-primary dark:text-white">
        Stay Informed, Stay Secure Always Ready
      </h3>
      <p className="mb-11 border-b border-body-color border-opacity-25 pb-11 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-25">
        Subscribe to receive exclusive updates, actionable security tips, detailed insights, and timely breach alerts to keep your business secure, resilient, and prepared in an increasingly vulnerable world.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          className="border-stroke mb-4 w-full rounded-lg border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-black dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-black dark:focus:shadow-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="border-stroke mb-4 w-full rounded-lg border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-black dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-black dark:focus:shadow-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mb-5 flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#0a0a0a] px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-[#0a0a0a]/90 dark:shadow-submit-dark ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </button>
      </form>
      <Toaster
        position="bottom-center" // Change position to the bottom-center
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default NewsletterBox;
