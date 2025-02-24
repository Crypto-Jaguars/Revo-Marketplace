// Define analytics data type
type AnalyticsData = {
  [key: string]: string | number | boolean | null | undefined;
};

const useAnalytics = () => {
    const trackEvent = (eventName: string, data?: AnalyticsData) => {
      console.log(`Analytics Event: ${eventName}`, data);
      // Here you can integrate tools like Google Analytics, Mixpanel, etc.
    };
  
    return { trackEvent };
  };
  
  export default useAnalytics;
  