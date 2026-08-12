package com.api.petStore.config;

import com.api.petStore.enums.Role;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(@NonNull FormatterRegistry registry) {
        registry.addConverter(new Converter<String, Role>() {
            @Override
            public Role convert(@NonNull String source) {
                return Role.valueOf(source.trim().toUpperCase());
            }
        });
    }

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        // Permissive dev-only CORS so the static frontend_petStore app (served from any local
        // origin/port) can call this API. Tighten this to a specific origin before any real deployment.
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
