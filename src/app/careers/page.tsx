import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, Monitor, Coffee, Users, Brain, Heart, LightbulbIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | Subscriptions Tracker",
  description:
    "Join our team at Subscriptions Tracker and help build the future of subscription management",
  alternates: {
    canonical: "https://subscriptions-tracker.com/careers",
  },
};

function BenefitCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-card border rounded-xl hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function JobCard({ title, department, location, type, description }) {
  return (
    <div className="p-6 bg-card border rounded-xl hover:shadow-md transition-shadow">
      <div className="mb-4">
        <span className="inline-block text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
          {department}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex items-center">
          <Monitor className="h-4 w-4 mr-1" />
          <span>{type}</span>
        </div>
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Link
        href={`/careers/${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="inline-flex items-center text-primary hover:underline"
      >
        View Position
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}

export default function CareersPage() {
  const benefits = [
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Flexible Work",
      description: "Choose to work remotely or from our offices with flexible hours that fit your lifestyle."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Comprehensive Healthcare",
      description: "Full medical, dental, and vision coverage for you and your dependents."
    },
    {
      icon: <LightbulbIcon className="h-6 w-6" />,
      title: "Learning & Development",
      description: "Annual learning stipend and dedicated time for professional growth and development."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Diverse & Inclusive Culture",
      description: "A workplace that celebrates diversity, promotes inclusion, and values every voice."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Mental Wellbeing",
      description: "Mental health resources, subscription to wellness apps, and company-wide wellness days."
    }
  ];

  const openJobs = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "We're looking for an experienced full stack engineer to help build and scale our subscription management platform using React, Node.js, and PostgreSQL."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Join our design team to create intuitive, beautiful experiences that help users manage their subscriptions effortlessly."
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Drive user acquisition and retention through data-driven marketing strategies across multiple channels."
    },
    {
      title: "Customer Success Specialist",
      department: "Customer Success",
      location: "New York, NY",
      type: "Full-time",
      description: "Help our users get the most value from Subscriptions Tracker by providing exceptional support and guidance."
    },
    {
      title: "Financial Data Analyst",
      department: "Data Science",
      location: "Remote",
      type: "Full-time",
      description: "Analyze financial subscription data to uncover insights and build recommendation algorithms that help users save money."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain our infrastructure, CI/CD pipelines, and ensure the reliability and security of our platform."
    }
  ];

  return (
    <main className="pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Mission to Simplify Subscription Management
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              We're building the tools that help people save money and gain clarity over their recurring expenses. Want to be part of it?
            </p>
            <Link
              href="#open-positions"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
              <div className="space-y-4 text-lg">
                <p>
                  At Subscriptions Tracker, we're passionate about helping people make smarter financial decisions through better subscription management.
                </p>
                <p>
                  Our team thrives on collaboration, innovation, and impact. We celebrate diverse perspectives and work together to solve challenging problems in creative ways.
                </p>
                <p>
                  We value work-life balance and believe that a healthy, happy team produces the best results. That's why we offer flexible work arrangements, generous benefits, and a supportive environment where everyone can do their best work.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Mission-Driven</h3>
                    <p className="text-muted-foreground">We're united by our mission to help people save money and reduce financial stress.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Growth Mindset</h3>
                    <p className="text-muted-foreground">We encourage continuous learning, experimentation, and personal development.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Trust & Autonomy</h3>
                    <p className="text-muted-foreground">We trust our team members and give them the autonomy to own their work.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg"
                  alt="Subscriptions Tracker team at work"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We care about our team's wellbeing and offer competitive benefits to support your professional and personal life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-8 items-center justify-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Competitive Salary</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Equity Options</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>401(k) Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Unlimited PTO</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Parental Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Home Office Stipend</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Team Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <blockquote className="p-6 bg-card rounded-xl border">
              <p className="italic mb-4">"The flexibility and autonomy I have at Subscriptions Tracker allows me to do my best work while maintaining a healthy work-life balance."</p>
              <footer>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg" alt="Team Member" width={40} height={40} />
                  </div>
                  <div>
                    <p className="font-semibold">Elena Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Senior Frontend Engineer</p>
                  </div>
                </div>
              </footer>
            </blockquote>
            <blockquote className="p-6 bg-card rounded-xl border">
              <p className="italic mb-4">"I love how mission-driven everyone is. We're genuinely helping people save money and reduce financial stress, which makes the work deeply meaningful."</p>
              <footer>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg" alt="Team Member" width={40} height={40} />
                  </div>
                  <div>
                    <p className="font-semibold">James Wilson</p>
                    <p className="text-sm text-muted-foreground">Product Manager</p>
                  </div>
                </div>
              </footer>
            </blockquote>
            <blockquote className="p-6 bg-card rounded-xl border">
              <p className="italic mb-4">"The growth opportunities here are incredible. I started as a customer support specialist and have been encouraged to develop my data analysis skills."</p>
              <footer>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg" alt="Team Member" width={40} height={40} />
                  </div>
                  <div>
                    <p className="font-semibold">Aisha Patel</p>
                    <p className="text-sm text-muted-foreground">Customer Insights Analyst</p>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our team and help build the future of subscription management. We're always looking for talented, passionate people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {openJobs.map((job, index) => (
              <JobCard
                key={index}
                title={job.title}
                department={job.department}
                location={job.location}
                type={job.type}
                description={job.description}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Don't see a role that fits your skills? We're always interested in meeting talented people.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              Send a General Application
            </Link>
          </div>
        </div>
      </section>

      {/* Interview Process */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Interview Process</h2>
            <p className="text-center text-lg text-muted-foreground mb-12">
              We've designed our interview process to be transparent, fair, and efficient. Here's what you can expect.
            </p>

            <div className="space-y-12">
              <div className="relative pl-12 pb-12 border-l border-muted-foreground/20">
                <div className="absolute top-0 left-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold">1</div>
                <h3 className="text-xl font-semibold mb-3">Application Review</h3>
                <p className="text-muted-foreground">
                  Our recruiting team reviews your application and resume. We aim to respond to all applicants within 1 week.
                </p>
              </div>
              
              <div className="relative pl-12 pb-12 border-l border-muted-foreground/20">
                <div className="absolute top-0 left-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold">2</div>
                <h3 className="text-xl font-semibold mb-3">Initial Conversation</h3>
                <p className="text-muted-foreground">
                  A 30-minute video call with a recruiter to discuss your background, interests, and learn more about the role and company.
                </p>
              </div>
              
              <div className="relative pl-12 pb-12 border-l border-muted-foreground/20">
                <div className="absolute top-0 left-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold">3</div>
                <h3 className="text-xl font-semibold mb-3">Skills Assessment</h3>
                <p className="text-muted-foreground">
                  Depending on the role, you might complete a take-home assignment or technical interview to demonstrate relevant skills.
                </p>
              </div>
              
              <div className="relative pl-12 pb-12 border-l border-muted-foreground/20">
                <div className="absolute top-0 left-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold">4</div>
                <h3 className="text-xl font-semibold mb-3">Team Interviews</h3>
                <p className="text-muted-foreground">
                  Meet with 3-4 team members for role-specific interviews and to get a better sense of our culture and work environment.
                </p>
              </div>
              
              <div className="relative pl-12">
                <div className="absolute top-0 left-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold">5</div>
                <h3 className="text-xl font-semibold mb-3">Final Interview & Offer</h3>
                <p className="text-muted-foreground">
                  A final conversation with the hiring manager or department head, followed by an offer if there's a mutual fit.
                </p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-card rounded-xl border">
              <h3 className="text-xl font-semibold mb-4">Our Commitment to Diversity</h3>
              <p className="text-muted-foreground">
                Subscriptions Tracker is committed to building a diverse, equitable, and inclusive workplace. We welcome applicants of all backgrounds, experiences, abilities, and perspectives. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability status, or any other characteristic protected by law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Explore our open positions and find your next career opportunity at Subscriptions Tracker.
          </p>
          <Link
            href="#open-positions"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground hover:bg-accent h-11 px-8"
          >
            View Open Positions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
