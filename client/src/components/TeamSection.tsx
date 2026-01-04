import TeamMember from "./TeamMember";
import ceoImage from "@assets/generated_images/male_ceo_headshot.png";
import ctoImage from "@assets/generated_images/female_cto_headshot.png";
import analystImage from "@assets/generated_images/male_analyst_headshot.png";
import strategistImage from "@assets/generated_images/female_strategist_headshot.png";
import vinay from "@assets/generated_images/vinay.jpeg";
import rishabh from "@assets/generated_images/rishabh.jpeg";
import jainam from "@assets/generated_images/jainam.jpeg";

// todo: remove mock functionality - replace with actual team data
const teamMembers = [
  {
    name: "Rishabh Mehta",
    title: "Chief Strategist",
    bio: "Expert in derivative strategies and quantitative research with a focus on risk-adjusted returns.",
    image:
      rishabh,
    linkedIn: "https://www.linkedin.com/in/rishabh-mehta-06b420279/",
  },
  {
    name: "Jainam Jain",
    title: "Chief Strategist",
    bio: "Specializes in algorithmic trading models and systematic market analysis.",
    image:
      jainam,
    linkedIn: "https://www.linkedin.com/in/jainam-jain-229050307/",
  },
  {
    name: "Vinay Khilwani",
    title: "Chief Technology Officer",
    bio: "Architect of high-performance trading infrastructure and quantitative execution systems.",
    image: vinay,
    linkedIn: "https://www.linkedin.com/in/vok8/",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-background" data-testid="section-team">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-team-title">
            Leadership Team
          </h2> */}
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our experienced co-founders bring together years of expertise in
            quantitative finance, technology and investment management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
