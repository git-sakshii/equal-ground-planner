# HalfwayMeet Setup Guide

## Google Maps API Setup

To use the location and mapping features, you need to configure a Google Maps API key.

### Step 1: Get Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "API Key"
5. Copy your new API key

### Step 2: Enable Required APIs

Enable the following APIs for your project:

- **Maps JavaScript API** - For displaying maps
- **Places API** - For address autocomplete
- **Directions API** - For calculating routes and travel times
- **Geocoding API** - For converting addresses to coordinates

To enable:
1. Go to "APIs & Services" > "Library"
2. Search for each API above
3. Click on it and press "Enable"

### Step 3: Configure API Key

1. Open `src/config/maps.ts`
2. Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual API key:

```typescript
export const GOOGLE_MAPS_CONFIG = {
  apiKey: "AIzaSyC...", // Your actual key here
  libraries: ["places", "geometry"],
  id: "google-map-script",
};
```

### Step 4: Secure Your API Key (Recommended)

To prevent unauthorized use:

1. In Google Cloud Console, go to "Credentials"
2. Click on your API key to edit it
3. Under "Application restrictions":
   - Select "HTTP referrers"
   - Add your domain(s): `localhost:8080`, `your-domain.com`
4. Under "API restrictions":
   - Select "Restrict key"
   - Select only the APIs you're using
5. Save changes

### Important Security Notes

⚠️ **For Production:**
- Always restrict your API key to specific domains
- Never commit API keys to public repositories
- Consider using API restrictions to limit which APIs can be called
- Monitor your API usage in Google Cloud Console

💡 **Billing:**
- Google Maps Platform requires a billing account
- You get $200 free credit per month
- Most small to medium apps stay within the free tier

### Testing

After setup, test the features:
1. Enter 2+ locations using the autocomplete
2. Click "Find Midpoint & Venues"
3. Verify the map displays correctly
4. Check that travel times are calculated

### Troubleshooting

**Map not loading?**
- Check console for errors
- Verify API key is correct
- Ensure all required APIs are enabled

**Autocomplete not working?**
- Verify Places API is enabled
- Check for console errors about quota limits

**Travel times not calculating?**
- Ensure Directions API is enabled
- Check your API key has proper permissions

### Cost Estimates

Based on Google Maps pricing (subject to change):

- **Maps JavaScript API:** $7 per 1,000 loads (after free tier)
- **Places API (Autocomplete):** $2.83 per 1,000 requests
- **Directions API:** $5 per 1,000 requests
- **Geocoding API:** $5 per 1,000 requests

With the $200/month free credit, you can handle approximately:
- ~28,000 map loads
- ~70,000 autocomplete requests
- ~40,000 direction calculations

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:8080](http://localhost:8080)

## Next Steps

After completing the setup:
- Test all location features
- Customize map styling in `src/config/maps.ts`
- Implement venue search (Part 3 of guide)
- Add voting/sharing features (Part 4 of guide)

---

Need help? Check out:
- [Google Maps Platform Documentation](https://developers.google.com/maps)
- [React Google Maps API Guide](https://react-google-maps-api-docs.netlify.app/)
