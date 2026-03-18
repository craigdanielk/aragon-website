import { Phase0Chat } from "./phase0-chat";

export const metadata = {
  title: "Phase 0 Discovery",
  description:
    "Have a conversation with our AI consultant to understand your business challenges and get a tailored proposal.",
};

export default function ConsultationPage() {
  return <Phase0Chat />;
}
