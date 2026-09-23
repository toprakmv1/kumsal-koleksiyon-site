import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { CategoryPage, CheckoutPage, ProductPage, SizeGuidePage } from "./pages/Storefront";
import { AccountPage, BlogPage, ContactPage, FaqPage, LegalPage } from "./pages/AdditionalPages";

function Router() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/kategori/:slug" component={CategoryPage} />
      <Route path="/urun/:id" component={ProductPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/beden-rehberi" component={SizeGuidePage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/hesabim" component={AccountPage} />
      <Route path="/sss" component={FaqPage} />
      <Route path="/iletisim" component={ContactPage} />
      <Route path="/gizlilik" component={() => <LegalPage type="gizlilik" />} />
      <Route path="/iade" component={() => <LegalPage type="iade" />} />
      <Route path="/mesafeli-satis" component={() => <LegalPage type="mesafeli" />} />
      <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster position="bottom-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
