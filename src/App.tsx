import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SiteLayout } from './components/layout/SiteLayout';
import { ScrollManager } from './components/layout/ScrollManager';
import { RequireAuth } from './components/layout/RequireAuth';
import { Landing } from './pages/Landing';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { HubLife } from './pages/HubLife';
import { HowItWorks } from './pages/HowItWorks';
import { Jobs } from './pages/Jobs';
import { About } from './pages/About';
import { Mentors } from './pages/Mentors';
import { Founder } from './pages/Founder';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { LearningSpace } from './pages/learning/LearningSpace';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { Verify } from './pages/auth/Verify';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Apply } from './pages/auth/Apply';
import { ApplyReceived } from './pages/auth/ApplyReceived';

interface AppProps {
  courseShowcase?: 'rows' | 'cards';
}

export function App({ courseShowcase = 'rows' }: AppProps) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollManager />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Landing courseShowcase={courseShowcase} />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:course" element={<CourseDetail />} />
            <Route path="/life" element={<HubLife />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/about" element={<About />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/contact" element={<Contact />} />
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<LearningSpace section="dashboard" />} />
              <Route path="/learning" element={<LearningSpace section="learning" />} />
              <Route path="/messages" element={<LearningSpace section="messages" />} />
              <Route path="/profile" element={<LearningSpace section="profile" />} />
              <Route path="/certificate" element={<LearningSpace section="certificate" />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/employers" element={<Navigate to="/contact?topic=hiring" replace />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/apply/received" element={<ApplyReceived />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>);

}