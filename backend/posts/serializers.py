from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    time = serializers.SerializerMethodField()
    tag = serializers.SerializerMethodField()
    tagColor = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'  
        read_only_fields = ['user', 'created_at']

    def get_time(self, obj):
        return obj.created_at.strftime("%b %d, %Y %H:%M")

    def get_tag(self, obj):
        return obj.custom_category if obj.category == 'Other' and obj.custom_category else obj.category

    def get_tagColor(self, obj):
        color_map = {
            "Workplace Issues": "#9E6263",
            "Safety Tips": "#C6A3B5",
            "Legal Help": "#643E43",
            "Other": "#9E6263",
        }
        tag = self.get_tag(obj)
        return color_map.get(tag, "#9E6263")
