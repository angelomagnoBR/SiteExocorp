#!/usr/bin/env python3
"""
Script para adicionar referências de imagens ao game.js
Baseado no mapeamento do GUIA_IMAGENS.md
"""

# Mapeamento completo de imagens por seção
IMAGE_MAPPING = {
    # PRÓLOGOS
    "prologo_nilo": "assets/nilo.png",
    "prologo_zhenliu": "assets/zhen.png",
    "prologo_caliope": "assets/caliope.png",
    "prologo_artz": "assets/artz.png",
    
    # ATO I - Retorno ao Nexus
    "001": "assets/bg_ruins.jpg",
    "002": "assets/bg_hospital.png",
    "003": "assets/bg_hospital.png",
    "004": "assets/bg_stasis.jpg",
    "005": "assets/bg_ruins.jpg",
    
    # ATO II - Missão 1: Guerra de Informação
    "010": "assets/bg_tower_exec.jpg",
    "011": "assets/bg_underground.jpg",
    "012": "assets/bg_news_studio.jpg",
    "013": "assets/bg_underground.jpg",
    "014": "assets/bg_news_studio.jpg",
    
    # ATO II - Missão 2: Busca por Aliados
    "020": "assets/bg_streets.jpg",
    "021": "assets/bg_hideout.jpg",
    "022": "assets/bg_underground.jpg",
    "023": "assets/bg_hideout.jpg",
    "024": "assets/bg_hideout.jpg",
    "025": "assets/bg_streets.jpg",
    "026": "assets/bg_hideout.jpg",
    
    # ATO II - Missão 3: Vantagem Tática
    "030": "assets/bg_streets.jpg",
    "031": "assets/bg_lab.jpg",
    "032": "assets/bg_teleport.jpg",
    "033": "assets/bg_streets.jpg",
    "034": "assets/bg_streets.jpg",
    
    # ATO III - Assalto à Torre
    "050": "assets/bg_ruins.jpg",
    "051": "assets/bg_helipad.jpg",
    "052": "assets/bg_underground.jpg",
    "053": "assets/bg_teleport.jpg",
    "054": "assets/bg_tower_exec.jpg",
    "055": "assets/bg_stasis.jpg",
    "056": "assets/bg_stasis.jpg",
    "057": "assets/bg_stasis.jpg",
    "058": "assets/bg_stasis.jpg",
    "060": "assets/bg_tower_exec.jpg",
    "061": "assets/bg_tower_exec.jpg",
    "062": "assets/bg_tower_exec.jpg",
    "063": "assets/bg_tower_exec.jpg",
    "064": "assets/bg_tower_exec.jpg",
    "065": "assets/bg_tower_exec.jpg",
    "066": "assets/bg_tower_exec.jpg",
    
    # FINAIS
    "FINAL_A": "assets/final_a_exodus.jpg",
    "FINAL_B": "assets/final_b_anarchy.jpg",
    "FINAL_C": "assets/final_c_vengeance.jpg",
    "FINAL_D": "assets/final_d_restoration.jpg",
    "FINAL_RUIM_A": "assets/final_bad_slavery.jpg",
}

def add_images_to_gamejs(input_file, output_file):
    """Adiciona campo 'image' em cada seção do game.js"""
    
    print(f"📖 Lendo {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"🔍 Encontradas {len(IMAGE_MAPPING)} seções para mapear")
    
    modifications = 0
    for section_id, image_path in IMAGE_MAPPING.items():
        # Procurar padrão: "SECTION_ID": {
        #                     title: "...",
        # E adicionar: image: "path",
        
        # Padrão para encontrar seção
        import re
        
        # Match: "section_id": {\n    title: "..."
        pattern = rf'("{section_id}"\s*:\s*\{{\s*\n\s*title:)'
        
        # Replacement: "section_id": {\n    image: "path",\n    title: "..."
        replacement = rf'"{section_id}": {{\n        image: "{image_path}",\n        title:'
        
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            modifications += 1
            print(f"  ✅ {section_id} → {image_path}")
        else:
            print(f"  ⚠️  {section_id} não encontrada no arquivo")
    
    print(f"\n💾 Salvando {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✨ Concluído! {modifications}/{len(IMAGE_MAPPING)} seções modificadas")
    return modifications

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("❌ Uso: python3 add_images.py <game.js>")
        print("   Exemplo: python3 add_images.py game.js")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = "game_with_images.js"
    
    try:
        count = add_images_to_gamejs(input_file, output_file)
        print(f"\n🎉 Arquivo atualizado: {output_file}")
        print(f"📊 Total de imagens adicionadas: {count}")
    except FileNotFoundError:
        print(f"❌ Arquivo não encontrado: {input_file}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Erro: {e}")
        sys.exit(1)
