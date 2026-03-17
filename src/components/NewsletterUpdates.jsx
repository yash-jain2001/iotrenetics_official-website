import { useState } from 'react';

export default function NewsletterUpdates() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "75d1e8f4-ba35-42f6-a2be-98141ad12f38");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      setResult("Error");
    }
  };

  return (
    <form onSubmit={onSubmit} className='flex gap-3'>
      <input type="email" name="email" required className='flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white focus:outline-none focus:border-accent transition-colors'/>
      <button type="submit" className='bg-accent text-white font-bold rounded-full px-8 py-3 hover:bg-white hover:text-accent transition-all duration-300'>Submit Form</button>
      <span>{result}</span>
    </form>
  );
}