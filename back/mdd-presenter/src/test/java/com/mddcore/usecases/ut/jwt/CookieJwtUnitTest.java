package com.mddcore.usecases.ut.jwt;

import com.mddcore.domain.models.User;
import com.mddinfrastructure.security.jwt.CookieJwt;
import com.mddinfrastructure.security.jwt.JwtTokenProvider;
import com.mddinfrastructure.security.userdetails.CustomUserDetails;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseCookie;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CookieJwtUnitTest {
    @InjectMocks
    private CookieJwt cookieJwt;
    @Mock
    private JwtTokenProvider jwtTokenProvider;
    @Mock
    private HttpServletRequest request;

    private final String jwtCookieName = "jwtCookieName";

    @BeforeEach
    void setUp() throws NoSuchFieldException, IllegalAccessException {
        setPrivateField(cookieJwt, "jwtCookie", "jwtCookie");
        setPrivateField(cookieJwt, "jwtRefreshCookie", "jwtRefreshCookie");
    }

    @Test
    public void generateJwtCookieWithCustomUserDetailsInput_ShouldReturnValidCookie() {

        CustomUserDetails userDetails = new CustomUserDetails(new User(1L, "theo@theo.com", "theo"
                ,null, null, null));
        String token = "testToken";

        doReturn(token).when(jwtTokenProvider).createToken(userDetails);

        ResponseCookie cookie = cookieJwt.generateJwtCookie(userDetails);

        assertThat(cookie.getName()).isEqualTo("jwtCookie");
        assertThat(cookie.getValue()).isEqualTo(token);
        assertThat(cookie.getPath()).isEqualTo("/api");
        assertThat(cookie.isHttpOnly()).isTrue();
    }

    @Test
    public void generateJwtCookieWithUserInput_ShouldReturnValidCookie() {
        User user = new User(1L, "theo@theo.com", "theo"
                ,null, null, null);
        CustomUserDetails userDetails =  new CustomUserDetails(user);
        String token = "testToken";

        doReturn(token).when(jwtTokenProvider).createToken(userDetails);

        ResponseCookie cookie = cookieJwt.generateJwtCookie(user);

        assertThat(cookie.getName()).isEqualTo("jwtCookie");
        assertThat(cookie.getValue()).isEqualTo(token);
        assertThat(cookie.getPath()).isEqualTo("/api");
        assertThat(cookie.isHttpOnly()).isTrue();
    }

    @Test
    void generateRefreshJwtCookie_ShouldReturnValidCookie() {
        String refreshToken = "refreshTokenValue";
        ResponseCookie cookie = cookieJwt.generateRefreshJwtCookie(refreshToken);

        assertThat(cookie.getName()).isEqualTo("jwtRefreshCookie");
        assertThat(cookie.getValue()).isEqualTo(refreshToken);
        assertThat(cookie.getPath()).isEqualTo("/api/auth/refresh-token");
        assertThat(cookie.isHttpOnly()).isTrue();
    }

    @Test
    void getJwtFromCookies_ShouldReturnJwtToken() {
        Cookie jwtCookie = new Cookie(jwtCookieName, "jwtTokenValue");

        doReturn(new Cookie[]{jwtCookie}).when(request).getCookies();

        String token = cookieJwt.getJwtFromCookies(request);

        verify(request, times(1)).getCookies();
        assertThat(token).isEqualTo("jwtTokenValue");
    }

    @Test
    void getJwtRefreshFromCookies_ShouldReturnRefreshToken() {
        String jwtRefreshCookieName = "jwtRefreshCookieName";
        Cookie refreshCookie = new Cookie(jwtRefreshCookieName, "refreshTokenValue");

        doReturn(new Cookie[]{refreshCookie}).when(request).getCookies();

        String refreshToken = cookieJwt.getJwtRefreshFromCookies(request);

        assertThat(refreshToken).isEqualTo("refreshTokenValue");
    }

    @Test
    public void getCleanJwtCookie_ShouldReturnEmptyCookie() {
        ResponseCookie cookie = cookieJwt.getCleanJwtCookie();

        assertThat(cookie.getValue()).isEqualTo("");
        assertThat(cookie.getPath()).isEqualTo("/api");
    }

    @Test
    public void getCleanJwtRefreshCookie_ShouldReturnEmptyCookie() {
        ResponseCookie cookie = cookieJwt.getCleanJwtRefreshCookie();

        assertThat(cookie.getValue()).isEqualTo("");
        assertThat(cookie.getPath()).isEqualTo("/api/auth/refresh-token");
    }

    private void setPrivateField(Object object, String fieldName, Object value) throws NoSuchFieldException, IllegalAccessException {
        Field field = object.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(object, value);
    }
}
