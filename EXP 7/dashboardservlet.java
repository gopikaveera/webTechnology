import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/dashboard")

public class DashboardServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);

        if(session != null)
        {
            String user = (String)session.getAttribute("username");

            if(user != null)
            {
                out.println("<h2>Welcome " + user + "</h2>");
                out.println("<a href='logout'>Logout</a>");
            }
        }
        else
        {
            response.sendRedirect("login.html");
        }
    }
}
