package org.example.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers(GET, "/device/owner/**").hasAnyAuthority( "ROLE_USER", "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(GET, "/device/**").hasAnyAuthority( "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(POST, "/device/**").hasAnyAuthority( "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(DELETE, "/device/**").hasAnyAuthority( "ROLE_ADMIN");
        http.authorizeRequests().antMatchers( "/device/**").hasAnyAuthority( "ROLE_ADMIN");
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilterBefore(new CustomAuthorizationFilter(), BasicAuthenticationFilter.class);
    }
}
