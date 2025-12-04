# 🚀 Quick Deployment Checklist

## Files to Upload (5 files total)

### ⭐ CRITICAL (Must upload):
- [ ] `/utils/form-submission.ts` - Webhook fix

### 🎨 Enhanced Messages:
- [ ] `/components/eastfield/Hero.tsx`
- [ ] `/components/eastfield/Location.tsx`
- [ ] `/components/eastfield/BottomNavigation.tsx`
- [ ] `/components/eastfield/FAQ.tsx`

## Upload Methods

### Method 1: GoDaddy File Manager
1. [ ] Login to GoDaddy
2. [ ] Go to File Manager
3. [ ] Upload each file to matching folder structure
4. [ ] Overwrite existing files when prompted

### Method 2: GitHub + Auto Deploy
1. [ ] Run: `git add utils/form-submission.ts components/eastfield/*.tsx`
2. [ ] Run: `git commit -m "Fix webhook and enhance messages"`
3. [ ] Run: `git push origin main`
4. [ ] Wait for auto-deployment (if configured)

### Method 3: Full Build
1. [ ] Run: `npm run build`
2. [ ] Upload entire `dist/` folder to GoDaddy
3. [ ] Replace old build folder

## Testing (After Upload)

### Test 1: Webhook
1. [ ] Submit enquiry form
2. [ ] Open DevTools → Console
3. [ ] See: "Sending to Cratio CRM with encoded params..."
4. [ ] Check Cratio CRM → Should show "Success" not "Invalid payload"

### Test 2: Success Messages
1. [ ] Submit from "Enquire Now" → See personalized message
2. [ ] Submit from "Book Site Visit" → See personalized message
3. [ ] Submit from "Contact Our Experts" → See personalized message

### Test 3: Data in CRM
1. [ ] Check Cratio CRM webhook logs
2. [ ] Verify fields show:
   - ✅ Client Name: "Your Test Name"
   - ✅ Mobile Number: "1234567890"
   - ✅ Email Address: "test@example.com"
   - ✅ Project: "Eastfield"

## ✅ Success Criteria

All checkboxes below should be ✅:

- [ ] Webhook shows "Success" in CRM logs
- [ ] All 4 fields properly mapped (not "id")
- [ ] Success messages show user's name and contact info
- [ ] Google Forms still receiving submissions
- [ ] No blank pages after form submission
- [ ] All buttons working (Enquire Now, Book Visit, Documents)

## 🆘 If Something Fails

1. Check browser console for errors
2. Verify file paths match exactly
3. Clear browser cache (Ctrl+Shift+Delete)
4. Test in incognito/private window
5. Check that webhook URL is correct in `/config/forms-config.ts`

## 📞 Quick Test

**Fastest way to test:**
1. Fill form with: Name="Test", Phone="1234567890", Email="test@test.com"
2. Submit
3. Check console → Should see webhook URL logged
4. Check CRM → Should see new lead with all 4 fields
5. Should see toast: "Thank you, Test! Your enquiry has been submitted..."

---

✨ **Ready to deploy!** Upload the 5 files above and run tests.
