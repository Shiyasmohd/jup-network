import axios, { AxiosInstance } from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.JUGAL_BASE_URL
});

// Function to fetch documents
export const getDocuments = async () => {
  try {
    const response = await api.get("/documents");
    const documents = response.data; 
    console.log("Documents:", documents);
    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

export const getDocumentInfo = async (documentId: string) => {
  try {
    const response = await api.get(`/document-info/${documentId}`);
    const documentInfo = response.data; // Assuming the response contains the document information
    console.log("Document Info:", documentInfo);
    return documentInfo;
  } catch (error) {
    console.error(`Error fetching document info for ID ${documentId}:`, error);
    throw error;
  }
};
export const getDocumentContent = async (
  documentId: string,
  pageNumber: number
) => {
  try {
    const response = await api.get(
      `/document/${documentId}?page_number=${pageNumber}`
    );
    const documentContent = response.data; // Assuming the response contains the document content
    console.log(
      `Content of document ${documentId}, Page ${pageNumber}:`,
      documentContent
    );
    return documentContent;
  } catch (error) {
    console.error(
      `Error fetching document content for ID ${documentId}, Page ${pageNumber}:`,
      error
    );
    throw error;
  }
};

// Function to fetch information about an act by ID
export const getActInfo = async (actId: string) => {
  try {
    const response = await api.get(`/act-info/${actId}`);
    const actInfo = response.data; // Assuming the response contains act information
    console.log(`Information for Act ID ${actId}:`, actInfo);
    return actInfo;
  } catch (error) {
    console.error(`Error fetching information for Act ID ${actId}:`, error);
    throw error;
  }
};
