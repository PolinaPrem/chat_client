
# Realtime Chat Application

This is a realtime chat application demonstrating communication using WebSockets. Fake incoming messages + reply messages

## Instructions to Run
1.  **Copy this directory** to your local machine.
    ```bash
    git clone https://github.com/PolinaPrem/chat_client.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd chat_client
    ```

3.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

4.  **Run the backend server:**
    ```bash
    npm run dev
    ```

5.  **Open a new terminal and navigate to the frontend directory:**
    ```bash
    cd frontend-vite
    npm install
    ```

6.  **Run the frontend application:**
    ```bash
    npm run dev
    ```
    

7.  **Open your browser to `http://localhost:5173/` .**

## Use Case

- Chat Client: 
After connecting to the server: the incoming fake messages, new users joining and users leaving the chat - events that are coming in every 4 seconds. In reply field theres an option to write a message and send it to the chat.



## Technologies Used
Mandatory Stack
- Frontend: React (with TypeScript ) + Vite
- Backend: Node.js + Express
- Real-time Communication: WebSocket




**Backend:**

* Node.js
* Express
* Socket.IO

**Frontend:**
* Vite
* React
* Socket.IO Client

## (Optional) Screenshots / GIFs
<img width="1196" alt="Screenshot 2025-06-03 at 15 13 52" src="https://github.com/user-attachments/assets/f5d916ae-f816-4203-bada-99cdcc7afc29" />


