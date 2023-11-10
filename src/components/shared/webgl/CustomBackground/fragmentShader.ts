const fragmentShader = `
uniform float u_time;

uniform vec3 u_bg;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec2 u_mouse;
uniform vec2 u_res;

varying vec2 vUv;


// void mainImage( out vec4 fragColor, in vec2 fragCoord )
// {
// 	vec2 uv = 1.5*(2.0*fragCoord.xy - iResolution.xy) / iResolution.y;
//     vec2 mouse = 1.5*(2.0*iMouse.xy - iResolution.xy) / iResolution.y;
// 	vec2 offset = vec2(cos(iTime/2.0)*mouse.x,sin(iTime/2.0)*mouse.y);;

// 	vec3 light_color = vec3(0.9, 0.65, 0.5);
// 	float light = 0.1 / distance(normalize(uv), uv);
	
// 	if(length(uv) < 1.0){
// 		light *= 0.1 / distance(normalize(uv-offset), uv-offset);
// 	}

// 	fragColor = vec4(light*light_color, 1.0);
// }


void main() {
  vec3 color = u_bg;

  vec2 uv = 1.5*(2.0*gl_FragCoord.xy - u_res.xy) / u_res.y;
    vec2 mouse = 1.5*(2.0*u_mouse.xy - u_res.xy) / u_res.y;

    vec2 offset = vec2(cos(u_time/2.0)*mouse.x,sin(u_time/2.0)*mouse.y);

    vec3 light_color = vec3(0.9, 0.65, 0.5);
    float light = 0.1 / distance(normalize(uv), uv);

     	if(length(uv) < 1.0){
 		light *= 0.1 / distance(normalize(uv-offset), uv-offset);
 	}

 	gl_FragColor = vec4(light*light_color, 1.0);
 

  // float noise1 = snoise(vUv + u_time * (sin(u_mouse.x * 0.001) + 0.2));
  // float noise2 = snoise(vUv + u_time * (sin(u_mouse.y * 0.001) + 0.2));

  // color = mix(color, u_colorA, noise1);
  // color = mix(color, u_colorB, noise2);
  
  // gl_FragColor = vec4(color ,1.0);
}

`

export default fragmentShader
