export default function LoginPage() {
    return (
       <div className="mt-4">
        <form>
            <input type="email" placeholder="your@gmail.com"/>
            <input type="password" placeholder="password"/>
            <button type="submit">Login</button>
        </form>
       </div>
    );
} 