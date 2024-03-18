package com.mddinfrastructure.user;

import com.mddcore.usecases.UseCaseExecutor;
import com.mddcore.usecases.auth.SignInRequest;
import com.mddcore.usecases.user.RegisterUseCase;
import com.mddinfrastructure.mapper.UserUpdateMapper;
import com.mddinfrastructure.request.UserSettingRequest;
import com.mddinfrastructure.security.jwt.CookieJwt;
import com.mddinfrastructure.security.jwt.JwtService;
import com.mddinfrastructure.security.usecases.AuthenticateUserUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.CompletableFuture;

@Component
public class AuthController implements AuthResource {
    private final UseCaseExecutor useCaseExecutor;
    private final RegisterUseCase registerUseCase;
    private final AuthenticateUserUseCase authenticateUserUseCase;
    private final CookieJwt cookieJwt;
    private final JwtService jwtService;

    public AuthController(UseCaseExecutor useCaseExecutor, RegisterUseCase registerUseCase,
                          AuthenticateUserUseCase authenticateUserUseCase, CookieJwt cookieJwt, JwtService jwtService) {
        this.useCaseExecutor = useCaseExecutor;
        this.registerUseCase = registerUseCase;
        this.authenticateUserUseCase = authenticateUserUseCase;
        this.cookieJwt = cookieJwt;
        this.jwtService = jwtService;
    }

    /**
     * Registers a user asynchronously.
     *
     * @param userSettingRequest The UserSettingRequest object containing user details.
     * @return A CompletableFuture containing the SignInRequest for the registered user.
     */
    @Override
    public CompletableFuture<SignInRequest> registerUser(@RequestBody UserSettingRequest userSettingRequest) {
        return useCaseExecutor.execute(
                registerUseCase,
                new RegisterUseCase.InputValues(UserUpdateMapper.INSTANCE.toDomain(userSettingRequest)),
                RegisterUseCase.OutputValues::signInRequest
        );
    }

    /**
     * Logs in a user asynchronously.
     *
     * @param signInRequest The SignInRequest object containing user credentials.
     * @return A CompletableFuture containing a ResponseEntity with authentication details.
     */
    @Override
    public CompletableFuture<ResponseEntity<?>> loginUser(@RequestBody SignInRequest signInRequest) {
        CompletableFuture<AuthenticateUserUseCase.OutputValues> authenticate = useCaseExecutor.execute(
                authenticateUserUseCase,
                new AuthenticateUserUseCase.InputValues(signInRequest),
                outputValues -> outputValues
        );

        return authenticate.thenCompose(value ->
                jwtService.generateAuthResponse(value.userDetails(), value.jwtCookie()));
    }

    /**
     * Logs out a user asynchronously.
     *
     * @return A CompletableFuture containing a ResponseEntity indicating the success or failure of the operation.
     */
    @Override
    public CompletableFuture<ResponseEntity<?>> logoutUser() {
        return jwtService.generateLogoutResponse();
    }

    /**
     * Refreshes a token asynchronously.
     *
     * @param request The HttpServletRequest containing the refresh token.
     * @return A CompletableFuture containing a ResponseEntity indicating the success or failure of the operation.
     */
    @Override
    public CompletableFuture<ResponseEntity<?>> refreshToken(HttpServletRequest request) {
        String token = cookieJwt.getJwtRefreshFromCookies(request);
        return jwtService.generateRefreshTokenResponse(token);
    }
}

