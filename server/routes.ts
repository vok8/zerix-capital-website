import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  initSpanner,
  getPerformanceData,
  getPerformanceData2,
  getStrategies,
  isSpannerConnected,
} from "./spanner";
import { z } from "zod";

// Initialize Spanner on module load
initSpanner();

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // API: Get performance data
  app.get("/api/performance", async (req, res) => {
    try {
      const data = await getPerformanceData();
      res.json({
        data,
        source: isSpannerConnected() ? "spanner" : "mock",
      });
    } catch (error) {
      console.error("Error fetching performance data:", error);
      res.status(500).json({ error: "Failed to fetch performance data" });
    }
  });

  app.get("/api/performance2", async (req, res) => {
    try {
      const data = await getPerformanceData2();
      res.json({
        data,
        source: isSpannerConnected() ? "spanner" : "mock",
      });
    } catch (error) {
      console.error("Error fetching performance data:", error);
      res.status(500).json({ error: "Failed to fetch performance data" });
    }
  });

  // API: Get strategies metadata
  app.get("/api/strategies", async (req, res) => {
    try {
      const strategies = await getStrategies();
      res.json({
        data: strategies,
        source: isSpannerConnected() ? "spanner" : "mock",
      });
    } catch (error) {
      console.error("Error fetching strategies:", error);
      res.status(500).json({ error: "Failed to fetch strategies" });
    }
  });

  // API: Health check for Spanner connection
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      spannerConnected: isSpannerConnected(),
      timestamp: new Date().toISOString(),
    });
  });

  // API: Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const result = contactFormSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: result.error.flatten(),
        });
      }

      const { name, email, company, message } = result.data;

      // Store the contact submission
      const submission = await storage.createContactSubmission({
        name,
        email,
        company: company || null,
        message,
      });

      console.log("Contact form submission received:", {
        id: submission.id,
        name,
        email,
        company,
      });

      res.json({
        success: true,
        message: "Thank you for your message. We'll be in touch soon.",
        id: submission.id,
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // API: Get all contact submissions (admin endpoint)
  app.get("/api/contact/submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({ data: submissions });
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  return httpServer;
}
