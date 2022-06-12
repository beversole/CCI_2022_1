// Author: Nathan Schager

precision mediump float;

varying vec2 v_TexCoord; // screen coord in our case
varying vec2 v_MarchCoord;

uniform float u_FadeOffset;
uniform float u_CohortSize;
uniform float u_Time;
uniform vec2 u_Mouse;
uniform vec2 u_UVScale;
uniform vec3 u_CameraPosition;
uniform sampler2D u_CohortImage0;
uniform sampler2D u_CohortImage1;

const int MAX_STEPS = 50;
const float DIST_THRESH = 0.01;
const float MAX_DIST = 10.0;
// const float INF = 1. / 0.;
const vec2 EPSILON = vec2(0.01, 0.);

float sdSphere(vec3 point, vec3 origin, float radius) {
    return length(point - origin) - radius;
}

float sdGyroid(vec3 point, vec3 origin, float scale) {
    vec3 p = scale * (point - origin);
    return dot(sin(p), cos(p.zxy)) / scale;
}

float getDist(vec3 point) {
    float dist = MAX_DIST;
    float scale = 1.;
    vec3 pt = point;
    vec3 g0Offset = vec3(0., sin(u_Time * 0.33), 0.);
    dist = min(dist, sdGyroid(point + g0Offset, vec3(0., -6., 0.), 0.3));
    dist = max(dist, -sdGyroid(point + g0Offset, vec3(0., -6., 0.), 0.6));
    dist = max(dist, -sdGyroid(point + g0Offset, vec3(0., -6., 0.), 0.9));
    pt.z = mod(pt.z, 8.);
    dist = max(dist, -sdSphere(pt, vec3(0.1, 1., 6.), 3.));
    return dist;
}

float rayMarch(vec3 rayOrigin, vec3 rayDirection) {
    float totalDist = 0.;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 point = rayOrigin + totalDist * rayDirection;
        float dist = getDist(point);
        totalDist += dist;
        if (dist < DIST_THRESH || dist > MAX_DIST) break;
    }
    return totalDist;
}

vec3 getNormal (vec3 point) {
    float dist = getDist(point);
    vec3 normal = dist - vec3(
        getDist(point - EPSILON.xyy),
        getDist(point - EPSILON.yxy),
        getDist(point - EPSILON.yyx));
    return normalize(normal);
}

float getLight(vec3 point) {
    vec3 lightPos = vec3(-3, 6, -6); // todo uniform
    vec3 lightRay = normalize(lightPos - point);
    vec3 normal = getNormal(point);
    float dif = clamp(dot(normal, lightRay), 0., 1.);
    float distLight = rayMarch(point + normal * DIST_THRESH * 2., lightRay);
    if (distLight < length(lightPos - point)) dif *= 0.1;
    return dif;
}

vec3 getSpecular(vec3 point, vec3 normal, vec3 rayDistance) {
    vec3 lightPos = vec3(-3, 6, -6); // todo uniform
    vec3 lightDirection = normalize(lightPos - point);
    float k_s = 0.6;
    float dotRV = clamp(dot(reflect(lightDirection, normal), -rayDistance), 0., 1.);
    vec3 i_s = vec3(1., 1., 1.);
    float alpha = 10.;
    vec3 specular = k_s * pow(dotRV, alpha) * i_s;
    return specular;
}

float getLight(vec3 point, vec3 normal) {
    vec3 lightPos = vec3(-3, 6, -6);
    vec3 lightRay = normalize(lightPos - point);
    float dif = clamp(dot(normal, lightRay), 0., 1.);
    float distLight = rayMarch(point + normal * DIST_THRESH * 2., lightRay);
    if (distLight < length(lightPos - point)) dif *= 0.1;
    return dif;
}

// vec2 getUV(vec3 point, int imageIndex) {
   
// }

vec2 getUVFromNormal(vec3 point, vec3 normal, float index) {
  vec2 uv = normal.xy - 0.5;
  uv.y /= u_CohortSize;
  uv.y += 2. * index / u_CohortSize - 0.02;
  uv.x *= 0.4;
  uv.x -= 0.2;
  return uv;
}

vec2 getUVFromDist(float dist) {
  vec2 uv = v_TexCoord;
  uv *= dist;
  uv.y += floor(uv.x) * 3.;
  return uv;
}

// https://gist.github.com/983/e170a24ae8eba2cd174f
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// https://gist.github.com/983/e170a24ae8eba2cd174f
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


/* discontinuous pseudorandom uniformly distributed in [-0.5, +0.5]^3 */
vec3 random3(vec3 c) {
	float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
	vec3 r;
	r.z = fract(512.0*j);
	j *= .125;
	r.x = fract(512.0*j);
	j *= .125;
	r.y = fract(512.0*j);
	return r-0.5;
}

// https://www.shadertoy.com/view/XsX3zB
/* skew constants for 3d simplex functions */
const float F3 =  0.3333333;
const float G3 =  0.1666667;

/* 3d simplex noise */
float simplex3d(vec3 p) {
	 /* 1. find current tetrahedron T and it's four vertices */
	 /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */
	 /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/
	 
	 /* calculate s and x */
	 vec3 s = floor(p + dot(p, vec3(F3)));
	 vec3 x = p - s + dot(s, vec3(G3));
	 
	 /* calculate i1 and i2 */
	 vec3 e = step(vec3(0.0), x - x.yzx);
	 vec3 i1 = e*(1.0 - e.zxy);
	 vec3 i2 = 1.0 - e.zxy*(1.0 - e);
	 	
	 /* x1, x2, x3 */
	 vec3 x1 = x - i1 + G3;
	 vec3 x2 = x - i2 + 2.0*G3;
	 vec3 x3 = x - 1.0 + 3.0*G3;
	 
	 /* 2. find four surflets and store them in d */
	 vec4 w, d;
	 
	 /* calculate surflet weights */
	 w.x = dot(x, x);
	 w.y = dot(x1, x1);
	 w.z = dot(x2, x2);
	 w.w = dot(x3, x3);
	 
	 /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */
	 w = max(0.6 - w, 0.0);
	 
	 /* calculate surflet components */
	 d.x = dot(random3(s), x);
	 d.y = dot(random3(s + i1), x1);
	 d.z = dot(random3(s + i2), x2);
	 d.w = dot(random3(s + 1.0), x3);
	 
	 /* multiply d by w^4 */
	 w *= w;
	 w *= w;
	 d *= w;
	 
	 /* 3. return the sum of the four surflets */
	 return dot(d, vec4(52.0));
}

void main (void) {

    // Raymarching
    vec2 marchUV = v_MarchCoord;
    vec3 rayOrigin = vec3(0., 1., 5.) + u_CameraPosition;
    vec3 rayDistance = normalize(vec3(marchUV.x, marchUV.y, 1.));
    float totalDist = rayMarch(rayOrigin, rayDistance);
    vec3 point = rayOrigin + rayDistance * totalDist;
    vec3 normal = getNormal(point);
    float fresnel = pow(clamp(1. - dot(normal, -rayDistance), 0., 1.), 5.);
    float light = getLight(point, normal);
    vec3 specular = getSpecular(point, normal, rayDistance);

    // Color + textures
    float index = floor(mod(point.z * 10., u_CohortSize));
    vec2 objectUV1 = getUVFromDist(totalDist) + vec2(0., u_Time + 0.02 * index);
    vec2 objectUV0 = getUVFromDist(totalDist) - vec2(0., u_Time - 0.02 * index);
    objectUV0 *= vec2(1.1, 0.1);
    objectUV1 *= vec2(1.1, 0.1);
    vec4 albedo0 = texture2D(u_CohortImage0, objectUV0);
    vec4 albedo1 = texture2D(u_CohortImage1, objectUV1);
    vec4 albedo = mix(albedo0, albedo1, mod(totalDist, 2.) * u_FadeOffset); // fade between the textures
    albedo.rgb += specular * 0.5;
    albedo.rgb += fresnel * vec3(0.7);
    albedo.rgb = mix(albedo.rgb, albedo.rgb * light, 0.2);
    albedo.rgb = mix(albedo.rgb, vec3(1., 0.8, 0.8), totalDist * 0.005);
    albedo.rgb = mix(albedo.rgb, albedo.rgb *  0.5 * (vec3(1., 0.8, 1.2) * normal + 1.), 0.2);
    albedo = mix(albedo, pow(albedo, vec4(vec3(1.7 / (totalDist * 0.05)), 1.)), 0.5);
    vec3 albedoHsv = rgb2hsv(albedo.rgb);
    albedoHsv.x += -0.04 + sin(u_Time * 0.05) * 0.22; // hue shift over time
    albedoHsv.y *= 1.4; // increase saturation
    albedoHsv.z *= 1.1; // increase value
    albedo.rgb = hsv2rgb(albedoHsv) * 1.225 + 0.05; // increase brightness + contrast
    albedo.rgb += 0.08 * simplex3d(vec3(v_TexCoord * 250., u_Time * 20.));
    gl_FragColor = albedo;
}