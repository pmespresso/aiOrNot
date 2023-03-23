// lib/gumroad.ts
import axios from "axios";

interface VerifyLicenseResponse {
  success: boolean;
  message?: string;
}

export async function verifyLicenseKey(
  productId: string,
  licenseKey: string,
): Promise<VerifyLicenseResponse> {
  try {
    const response = await axios.post(
      "https://api.gumroad.com/v2/licenses/verify",
      {
        product_id: productId,
        license_key: licenseKey,
      },
    );

    if (response.data.success) {
      return { success: true };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}
