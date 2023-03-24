import axios from "axios";

export const verifyLicenseKey = async (
  productId: string,
  licenseKey: string,
) => {
  try {
    const response = await axios.post(
      "https://api.gumroad.com/v2/licenses/verify",
      {
        product_id: productId,
        license_key: licenseKey,
      },
    );

    if (response.data.success) {
      return {
        success: true,
        purchase: response.data.purchase,
      };
    }

    return {
      success: false,
      message: "Invalid license key",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const PRODUCT_ID = "EQSgXHNbyKK7LHWUaILBkw==";
export const TEST_LICENSE_KEY = "E2FFF4AB-E92B401D-AE001F26-5378783E";
