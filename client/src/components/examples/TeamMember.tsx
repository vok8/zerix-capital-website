import TeamMember from "../TeamMember";
import ceoImage from "@assets/generated_images/male_ceo_headshot.png";

export default function TeamMemberExample() {
  return (
    <div className="p-6 max-w-sm">
      <TeamMember
        name="James Mitchell"
        title="Chief Executive Officer"
        bio="20+ years in quantitative finance. Former Head of Quant Trading at Goldman Sachs."
        image={ceoImage}
        linkedIn="https://linkedin.com"
      />
    </div>
  );
}
