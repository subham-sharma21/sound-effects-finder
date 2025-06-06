// API client for the sound effects backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Search for sound effects
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {number} pageSize - Number of results per page
 * @param {string} filter - Additional filter parameters
 * @returns {Promise<Object>} - Search results
 */
export async function searchSounds(query, page = 1, pageSize = 15, filter = '') {
  try {
    const params = new URLSearchParams({
      query,
      page,
      page_size: pageSize,
    });
    
    if (filter) {
      params.append('filter', filter);
    }
    
    const response = await fetch(`${API_URL}/search?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching sounds:', error);
    throw error;
  }
}

/**
 * Get details for a specific sound
 * @param {number} soundId - Sound ID
 * @returns {Promise<Object>} - Sound details
 */
export async function getSoundDetails(soundId) {
  try {
    const response = await fetch(`${API_URL}/sound/${soundId}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting sound details:', error);
    throw error;
  }
}

/**
 * Get download URL for a sound
 * @param {number} soundId - Sound ID
 * @returns {Promise<Object>} - Download URL information
 */
export async function getDownloadUrl(soundId) {
  try {
    const response = await fetch(`${API_URL}/download/${soundId}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting download URL:', error);
    throw error;
  }
}

