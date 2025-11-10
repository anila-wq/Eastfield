import { formsConfig, getGoogleFormUrl } from '../config/forms-config';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  date?: string;
  time?: string;
}

export interface SubmissionResult {
  success: boolean;
  googleForms?: boolean;
  webhooks?: boolean;
  errors?: string[];
}

/**
 * Submit form data to Google Forms
 */
async function submitToGoogleForms(
  formData: FormData,
  formType: 'enquiry' | 'siteVisit'
): Promise<boolean> {
  try {
    const config = formType === 'enquiry' 
      ? formsConfig.googleForms.enquiryForm 
      : formsConfig.googleForms.siteVisitForm;

    if (config.formId === 'YOUR_GOOGLE_FORM_ID') {
      console.warn('Google Forms not configured. Please update forms-config.ts');
      return false;
    }

    const formUrl = getGoogleFormUrl(config.formId);
    const formBody = new URLSearchParams();

    // Map form data to Google Forms entry IDs
    formBody.append(config.fields.name, formData.name);
    formBody.append(config.fields.email, formData.email);
    formBody.append(config.fields.phone, formData.phone);

    if (formType === 'enquiry' && formData.message) {
      formBody.append(config.fields.message, formData.message);
    }

    if (formType === 'siteVisit') {
      if (formData.date) {
        formBody.append(config.fields.date, formData.date);
      }
      if (formData.time) {
        formBody.append(config.fields.time, formData.time);
      }
    }

    // Submit to Google Forms using no-cors mode
    const response = await fetch(formUrl, {
      method: 'POST',
      body: formBody,
      mode: 'no-cors', // Required for Google Forms
    });

    // With no-cors, we can't read the response, so we assume success
    // console.log('Google Forms submission sent'); // Debug log - uncomment if needed
    return true;
  } catch (error) {
    console.error('Google Forms submission error:', error);
    return false;
  }
}

/**
 * Submit form data to webhooks
 * Uses multiple methods to ensure delivery to CRM
 */
async function submitToWebhooks(
  formData: FormData,
  formType: 'enquiry' | 'siteVisit'
): Promise<boolean> {
  const enabledWebhooks = formsConfig.webhooks.endpoints.filter(w => w.enabled);
  
  if (enabledWebhooks.length === 0) {
    console.warn('No webhooks configured. Please update forms-config.ts');
    return false;
  }

  console.log('Submitting to webhook with data:', {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    project: 'Eastfield'
  });

  const results = await Promise.allSettled(
    enabledWebhooks.map(async webhook => {
      if (webhook.url === 'YOUR_WEBHOOK_URL_HERE') {
        console.warn(`Webhook "${webhook.name}" not configured`);
        return Promise.reject('Not configured');
      }

      try {
        // Try multiple parameter name formats to ensure compatibility
        
        // Format 1: Build URL with exact field names (with leading space and proper encoding)
        const buildWebhookUrl = (fieldFormat: 'spaced' | 'underscored') => {
          const params: Record<string, string> = fieldFormat === 'spaced' 
            ? {
                ' Client Name': formData.name,
                ' Mobile Number': formData.phone,
                ' Email Address': formData.email,
                ' Project': 'Eastfield'
              }
            : {
                'Client_Name': formData.name,
                'Mobile_Number': formData.phone,
                'Email_Address': formData.email,
                'Project': 'Eastfield'
              };
          
          // Manually build query string to preserve spaces
          const queryParts: string[] = [];
          for (const [key, value] of Object.entries(params)) {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(value);
            queryParts.push(`${encodedKey}=${encodedValue}`);
          }
          
          const separator = webhook.url.includes('?') ? '&' : '?';
          return `${webhook.url}${separator}${queryParts.join('&')}`;
        };

        // Try format with leading spaces first (as per requirement)
        const urlWithSpaces = buildWebhookUrl('spaced');
        console.log('Webhook URL (with spaces):', urlWithSpaces);
        console.log('Decoded:', decodeURIComponent(urlWithSpaces));

        // Method 1: Send via image tag with spaced format
        const img1 = new Image();
        img1.style.display = 'none';
        img1.src = urlWithSpaces;
        document.body.appendChild(img1);
        
        setTimeout(() => {
          if (img1.parentNode) {
            document.body.removeChild(img1);
          }
        }, 3000);

        // Method 2: Also try underscored format as fallback
        const urlWithUnderscores = buildWebhookUrl('underscored');
        console.log('Webhook URL (with underscores):', urlWithUnderscores);
        
        const img2 = new Image();
        img2.style.display = 'none';
        img2.src = urlWithUnderscores;
        document.body.appendChild(img2);
        
        setTimeout(() => {
          if (img2.parentNode) {
            document.body.removeChild(img2);
          }
        }, 3000);

        // Method 3: Try fetch with no-cors
        try {
          await fetch(urlWithSpaces, {
            method: 'GET',
            mode: 'no-cors',
          });
          console.log('Webhook sent via fetch');
        } catch (fetchError) {
          console.log('Fetch error (expected with no-cors):', fetchError);
        }

        console.log(`Webhook "${webhook.name}" requests sent via multiple methods`);
        
        return Promise.resolve({ ok: true });
      } catch (error) {
        console.error(`Webhook "${webhook.name}" error:`, error);
        throw error;
      }
    })
  );

  // Return true if at least one webhook succeeded
  const hasSuccess = results.some(result => result.status === 'fulfilled');
  return hasSuccess;
}

/**
 * Main function to submit form data to all configured destinations
 */
export async function submitForm(
  formData: FormData,
  formType: 'enquiry' | 'siteVisit',
  options?: { redirect?: boolean }
): Promise<SubmissionResult> {
  const result: SubmissionResult = {
    success: false,
    errors: [],
  };

  // Submit to Google Forms if enabled
  if (formsConfig.googleForms.enabled) {
    try {
      const googleSuccess = await submitToGoogleForms(formData, formType);
      result.googleForms = googleSuccess;
      if (googleSuccess) {
        result.success = true;
      }
    } catch (error) {
      result.errors?.push('Google Forms submission failed');
      console.error('Google Forms error:', error);
    }
  }

  // Submit to webhooks if enabled
  if (formsConfig.webhooks.enabled) {
    try {
      const webhooksSuccess = await submitToWebhooks(formData, formType);
      result.webhooks = webhooksSuccess;
      if (webhooksSuccess) {
        result.success = true;
      }
    } catch (error) {
      result.errors?.push('Webhook submission failed');
      console.error('Webhooks error:', error);
    }
  }

  // If no integrations are configured, still show success for demo purposes
  if (!formsConfig.googleForms.enabled && !formsConfig.webhooks.enabled) {
    console.warn('No integrations configured. Form data:', formData);
    result.success = true;
    result.errors?.push('No integrations configured - form data logged to console');
  }

  // Redirect to thank you page if successful and redirect option is true
  if (result.success && options?.redirect !== false) {
    // Store user data in sessionStorage for the thank you page
    sessionStorage.setItem('thankYouData', JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      formType: formType
    }));
    
    // Redirect to thank you page
    window.location.hash = 'thankyou';
  }

  return result;
}
