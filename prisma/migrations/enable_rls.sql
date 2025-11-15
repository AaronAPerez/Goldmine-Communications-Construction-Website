-- Enable Row Level Security (RLS) on all tables
-- This script fixes the Supabase security warnings

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================

-- Users and Authentication tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

-- Project Management tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tags ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE RLS POLICIES
-- ============================================

-- Users table - only authenticated users can read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (auth.uid()::text = id);

CREATE POLICY "Admins can read all users"
  ON users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN')
    )
  );

CREATE POLICY "Admins can update users"
  ON users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN')
    )
  );

-- Projects table - authenticated users can read, admins/managers can modify
CREATE POLICY "Anyone can read projects"
  ON projects
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create projects"
  ON projects
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Project owners and admins can update"
  ON projects
  FOR UPDATE
  USING (
    "ownerId" = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER')
    )
  );

CREATE POLICY "Admins can delete projects"
  ON projects
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN')
    )
  );

-- Clients table
CREATE POLICY "Authenticated users can read clients"
  ON clients
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins and managers can modify clients"
  ON clients
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER', 'MARKETING')
    )
  );

-- Services table - public read, admin write
CREATE POLICY "Anyone can read services"
  ON services
  FOR SELECT
  USING ("isActive" = true);

CREATE POLICY "Admins can modify services"
  ON services
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN')
    )
  );

-- Project Services
CREATE POLICY "Anyone can read project services"
  ON project_services
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can modify project services"
  ON project_services
  FOR ALL
  USING (auth.uid() IS NOT NULL);

-- Project Images
CREATE POLICY "Anyone can read project images"
  ON project_images
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can upload images"
  ON project_images
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Project owners can modify images"
  ON project_images
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_images."projectId"
      AND projects."ownerId" = auth.uid()::text
    )
  );

CREATE POLICY "Admins can delete images"
  ON project_images
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN')
    )
  );

-- Project Documents
CREATE POLICY "Authenticated users can read documents"
  ON project_documents
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can upload documents"
  ON project_documents
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Project owners can modify documents"
  ON project_documents
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_documents."projectId"
      AND projects."ownerId" = auth.uid()::text
    )
  );

-- Milestones
CREATE POLICY "Authenticated users can read milestones"
  ON milestones
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Project team can modify milestones"
  ON milestones
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = milestones."projectId"
      AND (
        projects."ownerId" = auth.uid()::text
        OR EXISTS (
          SELECT 1 FROM team_members
          WHERE team_members."projectId" = projects.id
          AND team_members."userId" = auth.uid()::text
          AND team_members."isActive" = true
        )
      )
    )
  );

-- Project Phases
CREATE POLICY "Authenticated users can read phases"
  ON project_phases
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Project owners can modify phases"
  ON project_phases
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_phases."projectId"
      AND projects."ownerId" = auth.uid()::text
    )
  );

-- Team Members
CREATE POLICY "Authenticated users can read team"
  ON team_members
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can modify team"
  ON team_members
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER')
    )
  );

-- Equipment
CREATE POLICY "Authenticated users can read equipment"
  ON equipment
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can modify equipment"
  ON equipment
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER')
    )
  );

-- Project Equipment
CREATE POLICY "Authenticated users can read project equipment"
  ON project_equipment
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Project managers can modify project equipment"
  ON project_equipment
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER')
    )
  );

-- Certifications
CREATE POLICY "Anyone can read certifications"
  ON certifications
  FOR SELECT
  USING ("isActive" = true);

CREATE POLICY "Admins can modify certifications"
  ON certifications
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN')
    )
  );

-- Project Certifications
CREATE POLICY "Authenticated users can read project certifications"
  ON project_certifications
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can modify project certifications"
  ON project_certifications
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER')
    )
  );

-- Activity Logs
CREATE POLICY "Authenticated users can read activity logs"
  ON activity_logs
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "System can insert activity logs"
  ON activity_logs
  FOR INSERT
  WITH CHECK (true);

-- Comments
CREATE POLICY "Authenticated users can read comments"
  ON comments
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create comments"
  ON comments
  FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own comments"
  ON comments
  FOR UPDATE
  USING (auth.uid()::text = "userId");

CREATE POLICY "Users can delete own comments"
  ON comments
  FOR DELETE
  USING (auth.uid()::text = "userId");

-- Tags
CREATE POLICY "Anyone can read tags"
  ON tags
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify tags"
  ON tags
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()::text
      AND role IN ('SUPER_ADMIN', 'ADMIN')
    )
  );

-- Project Tags
CREATE POLICY "Anyone can read project tags"
  ON project_tags
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can modify project tags"
  ON project_tags
  FOR ALL
  USING (auth.uid() IS NOT NULL);

-- ============================================
-- AUTHENTICATION TABLES (NextAuth)
-- ============================================

-- These tables are managed by NextAuth and should be accessible
-- but we still enable RLS for security

-- Accounts - user can only see their own accounts
CREATE POLICY "Users can manage own accounts"
  ON accounts
  FOR ALL
  USING ("userId" = auth.uid()::text);

-- Sessions - user can only see their own sessions
CREATE POLICY "Users can manage own sessions"
  ON sessions
  FOR ALL
  USING ("userId" = auth.uid()::text);

-- Verification Tokens - allow creation and reading
CREATE POLICY "Allow token operations"
  ON verification_tokens
  FOR ALL
  USING (true);
