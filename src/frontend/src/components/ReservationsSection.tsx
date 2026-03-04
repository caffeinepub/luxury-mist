import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRestaurantInfo, useSubmitReservation } from "../hooks/useQueries";

const TIME_OPTIONS = [
  { value: "18:00", label: "6:00 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "21:00", label: "9:00 PM" },
];

const PARTY_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

const FALLBACK_INFO = {
  address: "28 Rue de la Paix, Paris, 75001",
  phone: "+1 (212) 555-0182",
  hours: "Tuesday – Sunday: 6 PM – 11 PM",
  email: "reservations@luxurymist.com",
};

export default function ReservationsSection() {
  const { data: info } = useRestaurantInfo();
  const mutation = useSubmitReservation();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    partySize: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.date) errs.date = "Date is required";
    if (!form.time) errs.time = "Time is required";
    if (!form.partySize) errs.partySize = "Party size is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await mutation.mutateAsync({
        name: form.name,
        email: form.email,
        date: form.date,
        time: form.time,
        partySize: Number(form.partySize),
        notes: form.notes,
      });
      setSubmitted(true);
      toast.success("Reservation request received!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const address = info?.address ?? FALLBACK_INFO.address;
  const phone = info?.phone ?? FALLBACK_INFO.phone;
  const hours = info?.hours ?? FALLBACK_INFO.hours;
  const email = info?.email ?? FALLBACK_INFO.email;

  const inputClass =
    "bg-[oklch(0.13_0.022_160)] border-[oklch(0.52_0.10_155/0.25)] text-mist placeholder:text-mist/30 focus:border-[oklch(0.52_0.10_155)] focus-visible:ring-[oklch(0.52_0.10_155/0.3)] font-inter font-light rounded-none h-12";

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[oklch(0.14_0.020_160)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="block w-12 h-px bg-[oklch(0.52_0.10_155)]" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-[oklch(0.52_0.10_155)]">
              Join Us
            </span>
            <span className="block w-12 h-px bg-[oklch(0.52_0.10_155)]" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl text-mist">
            Reserve a Table
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="font-playfair text-2xl text-mist mb-6">
                Contact & Hours
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-[oklch(0.52_0.10_155)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-inter text-xs tracking-widest uppercase text-[oklch(0.52_0.10_155)] mb-1">
                      Address
                    </p>
                    <p className="font-inter text-sm text-mist/70 font-light">
                      {address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-4 h-4 text-[oklch(0.52_0.10_155)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-inter text-xs tracking-widest uppercase text-[oklch(0.52_0.10_155)] mb-1">
                      Phone
                    </p>
                    <p className="font-inter text-sm text-mist/70 font-light">
                      {phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-4 h-4 text-[oklch(0.52_0.10_155)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-inter text-xs tracking-widest uppercase text-[oklch(0.52_0.10_155)] mb-1">
                      Email
                    </p>
                    <p className="font-inter text-sm text-mist/70 font-light">
                      {email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-4 h-4 text-[oklch(0.52_0.10_155)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-inter text-xs tracking-widest uppercase text-[oklch(0.52_0.10_155)] mb-1">
                      Hours
                    </p>
                    <p className="font-inter text-sm text-mist/70 font-light whitespace-pre-line">
                      {hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider quote */}
            <div className="border-t border-[oklch(0.52_0.10_155/0.2)] pt-8">
              <p className="font-playfair text-base italic text-mist/60 leading-relaxed">
                "A table at Luxury Mist is an invitation to breathe, savour, and
                be still."
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center h-full text-center py-20"
                data-ocid="reservation.success_state"
              >
                <div className="w-12 h-px bg-[oklch(0.52_0.10_155)] mx-auto mb-8" />
                <h3 className="font-playfair text-3xl text-mist mb-4">
                  Thank You
                </h3>
                <p className="font-inter text-base text-mist/60 font-light max-w-sm leading-relaxed">
                  Your reservation request has been received. We'll confirm via
                  email within 24 hours.
                </p>
                <div className="w-12 h-px bg-[oklch(0.52_0.10_155)] mx-auto mt-8" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label className="font-inter text-xs tracking-[0.2em] uppercase text-[oklch(0.52_0.10_155)]">
                      Full Name
                    </Label>
                    <Input
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className={inputClass}
                      data-ocid="reservation.input"
                    />
                    {errors.name && (
                      <p className="font-inter text-xs text-[oklch(0.577_0.245_27.325)]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="font-inter text-xs tracking-[0.2em] uppercase text-[oklch(0.52_0.10_155)]">
                      Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="font-inter text-xs text-[oklch(0.577_0.245_27.325)]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label className="font-inter text-xs tracking-[0.2em] uppercase text-[oklch(0.52_0.10_155)]">
                      Date
                    </Label>
                    <Input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, date: e.target.value }))
                      }
                      className={`${inputClass} [color-scheme:dark]`}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.date && (
                      <p className="font-inter text-xs text-[oklch(0.577_0.245_27.325)]">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <Label className="font-inter text-xs tracking-[0.2em] uppercase text-[oklch(0.52_0.10_155)]">
                      Time
                    </Label>
                    <Select
                      value={form.time}
                      onValueChange={(v) => setForm((f) => ({ ...f, time: v }))}
                    >
                      <SelectTrigger
                        className={`${inputClass} w-full`}
                        data-ocid="reservation.select"
                      >
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-[oklch(0.18_0.022_160)] border-[oklch(0.52_0.10_155/0.3)] text-mist rounded-none">
                        {TIME_OPTIONS.map((t) => (
                          <SelectItem
                            key={t.value}
                            value={t.value}
                            className="font-inter font-light hover:text-[oklch(0.52_0.10_155)] focus:text-[oklch(0.52_0.10_155)]"
                          >
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.time && (
                      <p className="font-inter text-xs text-[oklch(0.577_0.245_27.325)]">
                        {errors.time}
                      </p>
                    )}
                  </div>

                  {/* Party size */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="font-inter text-xs tracking-[0.2em] uppercase text-[oklch(0.52_0.10_155)]">
                      Party Size
                    </Label>
                    <Select
                      value={form.partySize}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, partySize: v }))
                      }
                    >
                      <SelectTrigger
                        className={`${inputClass} w-full sm:w-1/2`}
                        data-ocid="reservation.select"
                      >
                        <SelectValue placeholder="Number of guests" />
                      </SelectTrigger>
                      <SelectContent className="bg-[oklch(0.18_0.022_160)] border-[oklch(0.52_0.10_155/0.3)] text-mist rounded-none">
                        {PARTY_OPTIONS.map((n) => (
                          <SelectItem
                            key={n}
                            value={String(n)}
                            className="font-inter font-light hover:text-[oklch(0.52_0.10_155)] focus:text-[oklch(0.52_0.10_155)]"
                          >
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.partySize && (
                      <p className="font-inter text-xs text-[oklch(0.577_0.245_27.325)]">
                        {errors.partySize}
                      </p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label className="font-inter text-xs tracking-[0.2em] uppercase text-[oklch(0.52_0.10_155)]">
                    Special Requests{" "}
                    <span className="normal-case text-mist/30">(optional)</span>
                  </Label>
                  <Textarea
                    placeholder="Dietary requirements, celebrations, or other notes…"
                    value={form.notes}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, notes: e.target.value }))
                    }
                    className={`${inputClass} h-auto min-h-[100px] py-3 resize-none`}
                    data-ocid="reservation.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full sm:w-auto px-12 py-4 h-auto bg-[oklch(0.52_0.10_155)] text-[oklch(0.13_0.022_160)] hover:bg-[oklch(0.65_0.09_155)] font-inter text-sm tracking-[0.2em] uppercase font-medium rounded-none shadow-moss transition-all duration-300 cursor-pointer"
                  data-ocid="reservation.submit_button"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Requesting…
                    </>
                  ) : (
                    "Request Reservation"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
