# 여의도 라운지 (yeouidobar.com)

여의도역 도보 3분 거리 착석바·토킹바 매장의 정적 SEO 웹사이트.
구글·네이버 검색 1위 진입이 최종 목표.

## 🏗 기술 스택 / 배포

- **정적 HTML/CSS/JS** (빌드 도구 없음, 직접 편집)
- **호스팅**: Cloudflare Pages (yeouidobar.pages.dev)
- **도메인**: yeouidobar.com (Cloudflare DNS)
- **배포 흐름**: `git push` → Cloudflare 자동 빌드 → 1~3분 후 반영
- **작업 브랜치**: `claude/website-menu-structure-Wb9K0`
- **푸시 명령**: `git push -u origin claude/website-menu-structure-Wb9K0`

## 📁 디렉토리 구조

```
/                                  # 메인 (홈)
/yeouido-seated-talking-bar/       # 카테고리 허브 (착석바·토킹바)
  └─ /yeouido-seated-bar/, talking-bar/, room-seat/, price-hours/,
     reservation/, atmosphere/, location/, faq/   (자식 8개)
/moim-hoesik/                      # 카테고리 허브 (모임·회식)
  └─ /yeouido-after-work-gathering/, company-dinner-afterparty/,
     small-group-guide/, group-reservation/, seat-guide-by-people/,
     reservation-checklist/, meeting-faq/  (자식 7개)
/guide/                            # 카테고리 허브 (이용 안내)
  └─ /first-visit-guide/, reservation-guide/, business-hours/,
     visit-checklist/, use-guide/, guide-faq/  (자식 6개)
/{mapo,yongsan,yangcheon,dongjak,gangseo,seodaemun}-talkingbar/  # 지역 6개
/visit-reviews/                    # 후기 목록 (앨범 갤러리)
  └─ /after-work-party/, client-meeting/, team-dinner/  # 단독 후기 3개
/notice/, /events/                 # 공지·이벤트
/terms/, /privacy/                 # 법적 페이지
/404.html                          # 404
/robots.txt, /sitemap.xml, /rss.xml, /sitemap-index.xml
/site.webmanifest, /humans.txt, /favicon.svg, /CNAME
/assets/css/style.css              # 유일한 CSS (~64KB, minify됨)
/assets/js/main.js                 # 햄버거 메뉴만 처리
/assets/images/og-cover.svg        # 소셜 공유 이미지
```

총 **40개 HTML 페이지** + 정적 자산.

## 🎨 디자인 원칙

- **폰트**: 시스템 폰트 stack만 (Google Fonts 제거됨)
  ```
  -apple-system, BlinkMacSystemFont,
  'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕',
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
  ```
- **컬러**: 다크(#0a0a0a) + 골드 액센트(#d4ad6a, #e6c084)
- **font-weight 사용 가능**: 400, 700, 900 (3종만)
- **카카오 노란**: #fee500 (CTA 강조)
- **모바일 sticky CTA 바**: 모든 페이지 `</body>` 직전 정적 삽입 (JS 동적 삽입 금지)

## ⚙ 페이지 구조 표준

모든 페이지가 동일한 구조:
1. `<head>`: title, description, canonical, OG/Twitter, Schema JSON-LD, favicon/manifest, CSS preload+stylesheet
2. `<header class="site-header">`: 로고, GNB(5 카테고리 dropdown), 헤더 CTA(전화·카톡), 햄버거
3. `<main>`: breadcrumb → region-hero → region-section × N → CTA section
4. `<footer>`: 4col 정보 (브랜드/매장NAP/사업자/바로가기) + 하단 카피라이트
5. `<nav class="mobile-cta-bar">`: 모바일 sticky 하단 (전화 단독, 풀 폭)

### GNB 5개 카테고리 (절대 순서)
1. 홈
2. 여의도 착석바·토킹바 (자식 8) - `/yeouido-seated-talking-bar/`
3. 지역별 안내 (자식 6) - 메인의 `#location` 앵커
4. 모임·회식 (자식 7) - `/moim-hoesik/`
5. 이용 안내 (자식 6) - `/guide/`
6. 후기·공지 (자식 3) - `/visit-reviews/`
7. 문의하기 - 메인의 `#contact` 앵커

## 📊 SEO 표준

### 메타데이터 길이
- **title**: 40~65자 (네이버 권장)
- **description**: **80자 이내** (네이버 진단 기준 엄격)
- **og:description**: description과 동일하게 통일

### Schema.org JSON-LD (필수)
- 모든 페이지: `BarOrPub` + `BreadcrumbList`
- 메인: + `Organization` + `WebSite` + `FAQPage`
- 지역 페이지·FAQ 페이지: + `FAQPage`
- 후기 단독 페이지: + `Review`
- visit-reviews/ 목록: + `ItemList` + `AggregateRating`

### Schema 안에 반드시 들어가야 하는 값
```json
{
  "@type": "BarOrPub",
  "@id": "https://yeouidobar.com/#business",
  "name": "여의도 라운지",
  "telephone": "+82-10-3460-8953",
  "address": { "@type": "PostalAddress", ... },
  "openingHoursSpecification": [{ "opens": "18:00", "closes": "04:00", ... }]
}
```

### 헤딩 구조
- **페이지당 H1 정확히 1개**
- 본문 안에 H2 부제목 권장 (특히 후기·긴 페이지)
- 후기 단독 페이지의 후기 제목은 `<h1 class="review-title">`

### 경로 규칙
- **절대 경로 `/foo/` 사용 금지** (GitHub Pages 호환)
- 모두 상대 경로: depth 1은 `../`, depth 2는 `../../`
- depth 0(루트)는 그냥 `foo/`

### 검색엔진 인증 (이미 적용됨)
- Google Search Console: `zTN4afLeQ9KeW53wkgkO1yQGF-OFceIkh9kegopUNNo`
- Naver Webmaster Tools: `00a0724ba19a06eb9819b7fdc811b4572ea4a2fb`

## 🚫 금지 사항 (SEO 페널티 회피)

| 금지 | 이유 |
|------|------|
| 푸터에 sitemap 30+ 링크 | 사이트와이드 보일러플레이트 |
| 지역 페이지에 "지점" / "매장" 표현 | 도어웨이 페이지 (실제 매장 1곳) |
| "최고", "1등", "No.1", "프리미엄 No.1" | 부당광고 + SpamBrain |
| 같은 페이지 안에 동일 단락 반복 | 키워드 도배 |
| 6개 지역 페이지 60% 이상 내용 동일 | 도어웨이 자동 감지 |
| 자극적·선정적 이미지·문구 | SafeSearch 차단 |
| 가짜 후기 | 자동 패턴 감지 |
| Adult 카테고리 schema 자가 등록 | 자동 SafeSearch 분류 |

## 📝 자주 하는 작업 패턴

### 새 페이지 추가 시 체크리스트
1. HTML 헤드: title/description/canonical/OG/Schema/favicon 풀세트
2. 헤더: 5개 카테고리 GNB 일관 (다른 페이지 헤더 복사)
3. Breadcrumb: `홈 > 카테고리 > 페이지` 명확
4. H1 1개, H2 부제목 4개 권장
5. 본문 1,000자 이상 (지역 페이지는 2,000자+)
6. 마지막: CTA 섹션
7. `</body>` 직전: mobile-cta-bar 정적 삽입
8. sitemap.xml에 URL 등록
9. 모든 페이지 GNB·footer에 새 페이지 링크 (필요시)

### 일괄 갱신 작업
- 40개 HTML에 동일 변경 시 **반드시 Python 스크립트로** 처리
- `glob.glob('**/*.html', recursive=True)` + regex replace 패턴
- 변경 후 잔여 검증 필수 (예: 옛 슬러그/번호/문구 잔여 0건 확인)
- 사용자 정보(전화·주소) 변경 시 `*.html`, `*.txt`, `*.xml`, `*.webmanifest` 모두 검사

### 일괄 처리 자주 변경되는 값
- 매장명: "여의도 라운지" (placeholder, 실제 값 받으면 일괄 변경)
- 대표명: "홍길동" (placeholder)
- 주소: "여의도동 00-00" (placeholder)
- 사업자번호: "000-00-00000" (placeholder)
- 전화: **010-3460-8953** (실제 번호)
- 카톡 채널: `https://pf.kakao.com/_xxxxxx` (placeholder)
- 도메인: `yeouidobar.com` (실제) / Schema·canonical 일부에 `yeouidobar.example.com` 남아있음 → 전부 `yeouidobar.com`으로 일괄 교체 권장

## 🔧 CSS 작업 주의

- **위험한 minify 금지**: `0px → 0` 같은 정규식 변환은 일부 컨텍스트 깨뜨림 (전에 사고남)
- **안전한 minify만**: 주석 제거 / 빈 줄 압축 / 연속 공백 → 1개
- **`@font-face size-adjust/ascent-override`** 추가 금지: 옛 모바일 Safari에서 전체 stylesheet 무효화 사고 발생
- 변경 후 검증: `{` 와 `}` 개수 같은지 확인

```python
# 안전한 minify 패턴
css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
css = '\n'.join(line.strip() for line in css.split('\n'))
css = re.sub(r'\n+', '\n', css).strip()
```

## 🐍 자주 쓰는 Python 스크립트 패턴

```python
# 모든 HTML 파일 일괄 처리
import glob
files = glob.glob('**/*.html', recursive=True)
for fp in files:
    with open(fp, 'r', encoding='utf-8') as f:
        html = f.read()
    # 변경 작업
    new = html.replace('OLD', 'NEW')
    if new != html:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new)

# nav/footer 일괄 교체 시 depth 구분
# depth 0: index.html, 404.html
# depth 1: 대부분 서브 페이지
# depth 2: visit-reviews/{slug}/
```

## 📐 콘텐츠 차별화 원칙

- **지역 페이지 6개**: 각 지역마다 고유한 야간 교통(막차 시간)/1차 상권명/평균 대리비 등 구체 숫자 포함
- **FAQ 페이지 3개**: 질문 중복 0건 (yeouido-faq=매장, meeting-faq=회식, guide-faq=이용 절차)
- **후기**: 가짜 X, 솔직한 단점 포함 필수 (EEAT 강화)
- **모든 페이지**: 사람 중심 콘텐츠 (검색엔진용 키워드 도배 금지)

## ⚡ 성능 최적화 상태

- Google Fonts 완전 제거 (LCP·렌더링 차단 해결)
- CSS minify (~64KB → ~59KB)
- HTML minify
- Mobile CTA bar HTML 정적 삽입 (JS reflow 0)
- 추가 점수 향상은 Cloudflare 대시보드:
  - Speed → Optimization → Auto Minify (HTML/CSS/JS) ON
  - Brotli ON
  - Early Hints ON

## 🌐 도메인·DNS

- 도메인 구매처: GoDaddy → Cloudflare DNS 위임
- Cloudflare Pages 프로젝트명: `yeouidobar`
- GitHub 저장소: `guhara1/yeouidobar`
- DNS Production branch: `claude/website-menu-structure-Wb9K0`

## 🎯 사용자 우선순위 (작업 시 항상 고려)

1. **구글 1위 진입** (최종 목표)
2. **네이버 검색** 동시 공략 (한국 시장)
3. **모바일 우선** UI (sticky CTA, 시인성·가독성)
4. **EEAT 강화** (실제 후기·매장 답글·사업자 정보)
5. **법적 준수** (만 19세, 사업자등록, 합법 영업 명시)
