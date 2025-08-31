const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ChatService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async testConnection() {
        try {
            const response = await fetch(`${this.baseURL}/health`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ Backend connected:', data);
            return { success: true, data };

        } catch (error) {
            console.error('❌ Backend connection failed:', error);
            return {
                success: false,
                error: error.message,
                data: { status: 'unhealthy', message: 'Cannot connect to server' }
            };
        }
    }

    async sendMessage(question) {
        try {
            // FIX: Added /api to the URL path to match the backend route
            console.log(`📤 Sending message to ${this.baseURL}/api/chat`);

            const response = await fetch(`${this.baseURL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ message: question.trim() }), // Changed 'question' to 'message' to match the backend's Pydantic model
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Message sent successfully');
            return { success: true, data };

        } catch (error) {
            console.error('❌ Send failed:', error);
            return {
                success: false,
                error: error.message || 'Failed to send message'
            };
        }
    }
}

export const chatService = new ChatService();
export default chatService;