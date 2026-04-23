import { redirect } from "next/navigation";

export const metadata = {
  title: "Contact | VibePrompt",
  description: "Get in touch about VibePrompt, email or GitHub.",
};

export default function ContactPage() {
  redirect("/about");
}
