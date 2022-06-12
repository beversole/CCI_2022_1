// Auther: Nathan Schager

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 v_TexCoord;
varying vec2 v_MarchCoord;

uniform vec2 u_Resolution;

// screenspace quad default setup
void main() {
  v_TexCoord = vec2(aTexCoord.x, 1. - aTexCoord.y);
  v_MarchCoord = (v_TexCoord - 0.5) * (u_Resolution.xy / u_Resolution.xx);
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}